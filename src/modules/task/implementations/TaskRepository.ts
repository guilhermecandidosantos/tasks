import { PrismaClient } from "@prisma/client";
import { inject, injectable } from "tsyringe";

import { IEditTaskDTO } from "../dtos/IEditTaskDTO";
import { IMarkCompletedTaskDTO } from "../dtos/IMarkCompletedTaskDTO";
import { Task } from "../entities/Task";
import { ITasksRepository } from "../repositories/ITasksRepository";

@injectable()
class TaskRepository implements ITasksRepository {
  constructor(
    @inject("PrismaClient")
    private prisma: PrismaClient,
  ) {}
  async findAllTasks(userId: string): Promise<Task[]> {
    const tasks = await this.prisma.task.findMany({ where: { userId } });

    return tasks;
  }

  async findTaskById(id: string): Promise<Task> {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    return task;
  }

  async create({
    id, userId, content, createdDate, forecastDate,
  }: Task): Promise<void> {
    await this.prisma.task.create({
      data: {
        id, userId, content, createdDate, forecastDate,
      },
    });
  }

  async editTask({ id, content, forecastDate }: IEditTaskDTO): Promise<Task> {
    const task = await this.prisma.task.update({ data: { content, forecastDate }, where: { id } });

    return task;
  }

  async markCompletedTask({ id, completedDate }: IMarkCompletedTaskDTO): Promise<Task> {
    const task = await this.prisma.task.update({ data: { completedDate }, where: { id } });

    return task;
  }

  async deleteTask(id: string): Promise<void> {
    await this.prisma.task.delete({ where: { id } });
  }
}

export { TaskRepository };
