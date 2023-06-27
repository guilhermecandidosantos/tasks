import { PrismaClient } from "@prisma/client";
import { UsersRepository } from "modules/account/implementations/UsersRepository";
import { UsersTokenRepository } from "modules/account/implementations/UsersTokenRepository";
import { IUsersRepository } from "modules/account/repositories/IUsersRepository";
import { IUsersTokenRepository } from "modules/account/repositories/IUsersTokenRepository";
import { container } from "tsyringe";
import "./providers/DayJSProvider";
import { ITasksRepository } from "modules/task/repositories/ITasksRepository";
import { TaskRepository } from "modules/task/implementations/TaskRepository";

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

container.registerSingleton<ITasksRepository>(
  "TasksRepository",
  TaskRepository,
);
