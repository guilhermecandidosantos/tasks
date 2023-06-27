import { Task } from "modules/task/entities/Task";
import { ITasksRepository } from "modules/task/repositories/ITasksRepository";
import { AppError } from "shared/http/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class FindTaskByIdUseCase {
  constructor(
    @inject("TasksRepository")
    private tasksRepository: ITasksRepository,
  ) {}

  async execute(id: string): Promise<Task> {
    try {
      const task = await this.tasksRepository.findTaskById(id);

      return task;
    } catch (error) {
      throw new AppError(error.message);
    }
  }
}

export { FindTaskByIdUseCase };
