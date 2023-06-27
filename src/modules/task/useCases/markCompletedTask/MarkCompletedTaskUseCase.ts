import { Task } from "modules/task/entities/Task";
import { ITasksRepository } from "modules/task/repositories/ITasksRepository";
import { IDayJSProvider } from "shared/container/providers/DayJSProvider/repositories/IDayJSProvider";
import { AppError } from "shared/http/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class MarkCompletedTaskUseCase {
  constructor(
    @inject("TasksRepository")
    private tasksRepository: ITasksRepository,
    @inject("DayJSProvider")
    private dayJSProvider: IDayJSProvider,
  ) {}

  async execute(id: string): Promise<Task> {
    const completedDate = this.dayJSProvider.dateNow();

    try {
      const task = await this.tasksRepository.markCompletedTask({ id, completedDate });

      return task;
    } catch (error) {
      throw new AppError(error.message);
    }
  }
}

export { MarkCompletedTaskUseCase };
