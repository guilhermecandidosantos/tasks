import { User } from "modules/account/entities/User";
import { IUsersRepository } from "modules/account/repositories/IUsersRepository";
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
  ) {}

  async execute({
    gitHubId, username, avatarUrl,
  }: User) {
    const createdAt = this.dayJSProvider.dateNow();

    const id = v4();

    const user = await this.usersRepository.findByGitHubId(gitHubId);

    if (!user) {
      try {
        await this.usersRepository.create({
          id, gitHubId, username, avatarUrl, createdAt,
        });
      } catch (error) {
        throw new AppError(error.message);
      }
    }
  }
}

export { LoginWithGitHubUseCase };
