import { ITasksRepository } from "modules/task/repositories/ITasksRepository";
import { AppError } from "shared/http/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class DeleteTaskUseCase {
  constructor(
    @inject("TasksRepository")
    private tasksRepository: ITasksRepository,
  ) {}

  async execute(id: string): Promise<void> {
    try {
      await this.tasksRepository.deleteTask(id);
    } catch (error) {
      throw new AppError(error.message);
    }
  }
}

export { DeleteTaskUseCase };
