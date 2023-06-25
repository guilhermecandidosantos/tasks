import { PrismaClient } from "@prisma/client";
import { inject, injectable } from "tsyringe";

import { UserToken } from "../entities/UserToken";
import { IUsersTokenRepository } from "../repositories/IUsersTokenRepository";

@injectable()
class UsersTokenRepository implements IUsersTokenRepository {
  constructor(
    @inject("PrismaClient")
    private prisma: PrismaClient,
  ) {}

  async create({
    id, userId, accessToken, refreshToken, createdAt, expiresIn,
  }: UserToken): Promise<void> {
    await this.prisma.userToken.create({
      data: {
        id, userId, accessToken, refreshToken, createdAt, expiresIn,
      },
    });
  }
  async findByUserId(userId: string): Promise<UserToken> {
    const userToken = this.prisma.userToken.findUnique({ where: { userId } });

    return userToken;
  }
  async deleteTokenWithUserId(userId: string): Promise<void> {
    await this.prisma.userToken.delete({ where: { userId } });
  }
}

export { UsersTokenRepository };
