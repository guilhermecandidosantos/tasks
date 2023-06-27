import { IEditTaskDTO } from "modules/task/dtos/IEditTaskDTO";
import { Task } from "modules/task/entities/Task";
import { ITasksRepository } from "modules/task/repositories/ITasksRepository";
import { AppError } from "shared/http/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class EditTaskUseCase {
  constructor(
    @inject("TasksRepository")
    private tasksRepository: ITasksRepository,
  ) {}

  async execute({ id, content, forecastDate }: IEditTaskDTO): Promise<Task> {
    try {
      const task = await this.tasksRepository.editTask({ id, content, forecastDate });

      return task;
    } catch (error) {
      throw new AppError(error);
    }
  }
}

export { EditTaskUseCase };
