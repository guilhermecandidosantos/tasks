import { decodedToken, generateNewRefreshToken } from "lib/tokens";
import { IUsersTokenRepository } from "modules/account/repositories/IUsersTokenRepository";
import { IDayJSProvider } from "shared/container/providers/DayJSProvider/repositories/IDayJSProvider";
import { AppError } from "shared/http/errors/AppError";
import { inject, injectable } from "tsyringe";
import { v4 } from "uuid";

interface IReturn {
  accessToken: string;
  refreshToken: string;
}
@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokenRepository")
    private usersTokenRepository: IUsersTokenRepository,
    @inject("DayJSProvider")
    private dayJSProvider: IDayJSProvider,
  ) {}
  async execute(refresh_token: string): Promise<IReturn> {
    const userId = decodedToken(refresh_token);

    const userToken = await this.usersTokenRepository.findByUserId(userId);

    if (userToken.refreshToken !== refresh_token) {
      throw new AppError("Invalid refresh token", 401);
    }

    let tokens = Object();

    if (!userToken) {
      throw new AppError("Refresh token not found");
    } else {
      await this.usersTokenRepository.deleteTokenWithUserId(userId);

      tokens = generateNewRefreshToken(refresh_token);

      const id = v4();

      const createdAt = this.dayJSProvider.dateNow();

      const expiresIn = this.dayJSProvider.expiresIn15Minutes();

      await this.usersTokenRepository.create({
        id,
        userId,
        accessToken: tokens.accessToken,
        refreshToken:
        tokens.refreshToken,
        createdAt,
        expiresIn,
      });
    }

    return tokens;
  }
}

export { RefreshTokenUseCase };
