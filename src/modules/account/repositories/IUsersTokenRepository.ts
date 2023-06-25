import { UserToken } from "../entities/UserToken";

interface IUsersTokenRepository {
  create({
    id, userId, accessToken, refreshToken, createdAt, expiresIn,
  }: UserToken): Promise<void>;
  findByUserId(userId: string): Promise<UserToken>;
  deleteTokenWithUserId(userId: string): Promise<void>;
}

export { IUsersTokenRepository };
