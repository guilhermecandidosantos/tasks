import { PrismaClient } from "@prisma/client";
import { UsersRepository } from "modules/account/implementations/UsersRepository";
import { IUsersRepository } from "modules/account/repositories/IUsersRepository";
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
