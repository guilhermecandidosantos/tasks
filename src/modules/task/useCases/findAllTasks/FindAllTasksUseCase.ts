import { Task } from "modules/task/entities/Task";
import { ITasksRepository } from "modules/task/repositories/ITasksRepository";
import { AppError } from "shared/http/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class FindAllTasksUseCase {
  constructor(
    @inject("TasksRepository")
    private tasksRepository: ITasksRepository,
  ) {}

  async execute(): Promise<Task[]> {
    try {
      const tasks = await this.tasksRepository.findAllTasks();

      return tasks;
    } catch (error) {
      throw new AppError(error.message);
    }
  }
}

export { FindAllTasksUseCase };
