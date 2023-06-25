import { PrismaClient } from "@prisma/client";
import { UsersRepository } from "modules/account/implementations/UsersRepository";
import { UsersTokenRepository } from "modules/account/implementations/UsersTokenRepository";
import { IUsersRepository } from "modules/account/repositories/IUsersRepository";
import { IUsersTokenRepository } from "modules/account/repositories/IUsersTokenRepository";
import { container } from "tsyringe";
import "./providers/DayJSProvider";

container.register<PrismaClient>(
  "PrismaClient",
  { useValue: new PrismaClient() },
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository,
);

container.registerSingleton<IUsersTokenRepository>(
  "UsersTokenRepository",
  UsersTokenRepository,
);
