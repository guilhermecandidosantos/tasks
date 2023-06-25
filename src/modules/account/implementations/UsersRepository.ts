import { PrismaClient } from "@prisma/client";
import { inject, injectable } from "tsyringe";

import { User } from "../entities/User";
import { IUsersRepository } from "../repositories/IUsersRepository";

@injectable()
class UsersRepository implements IUsersRepository {
  constructor(
    @inject("PrismaClient")
    private prisma: PrismaClient,
  ) {}

  async create({
    id, gitHubId, username, avatarUrl, createdAt,
  }: User): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        id, gitHubId, username, avatarUrl, createdAt,
      },
    });

    return user;
  }

  async findByGitHubId(gitHubId: number): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { gitHubId } });

    return user;
  }
}

export { UsersRepository };
