import { generateNewRefreshToken, generateTokens } from "lib/tokens";
import { User } from "modules/account/entities/User";
import { IUsersRepository } from "modules/account/repositories/IUsersRepository";
import { IUsersTokenRepository } from "modules/account/repositories/IUsersTokenRepository";
import { IDayJSProvider } from "shared/container/providers/DayJSProvider/repositories/IDayJSProvider";
import { AppError } from "shared/http/errors/AppError";
import { inject, injectable } from "tsyringe";
import { v4 } from "uuid";

@injectable()
class LoginWithGitHubUseCase {
  constructor(
    @inject("DayJSProvider")
    private dayJSProvider: IDayJSProvider,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokenRepository")
    private usersTokenRepository: IUsersTokenRepository,
  ) {}

  async execute({
    gitHubId, username, avatarUrl,
  }: User) {
    const createdAt = this.dayJSProvider.dateNow();

    const id = v4();

    let user = await this.usersRepository.findByGitHubId(gitHubId);

    if (!user) {
      try {
        user = await this.usersRepository.create({
          id, gitHubId, username, avatarUrl, createdAt,
        });
      } catch (error) {
        throw new AppError(error.message);
      }
    }

    const usersToken = await this.usersTokenRepository.findByUserId(user.id);

    let tokens = Object();

    const tokenId = v4();

    const expiresIn = this.dayJSProvider.expiresIn15Minutes();

    if (!usersToken) {
      tokens = generateTokens(user.id, user.avatarUrl);

      await this.usersTokenRepository.create({
        id: tokenId,
        userId: user.id,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        createdAt,
        expiresIn,
      });
    } else {
      try {
        await this.usersTokenRepository.deleteTokenWithUserId(user.id);

        tokens = generateTokens(user.id, user.avatarUrl);

        await this.usersTokenRepository.create({
          id: tokenId,
          userId: user.id,
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          createdAt,
          expiresIn,
        });
      } catch (error) {
        throw new AppError(error.message);
      }
    }

    return tokens;
  }
}

export { LoginWithGitHubUseCase };
