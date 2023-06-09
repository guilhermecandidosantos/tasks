import { User } from "../entities/User";

interface IUsersRepository {
  create({
    id, gitHubId, username, avatarUrl, createdAt,
  }: User): Promise<User>
  findByGitHubId(gitHubId: number): Promise<User>
}

export { IUsersRepository };
