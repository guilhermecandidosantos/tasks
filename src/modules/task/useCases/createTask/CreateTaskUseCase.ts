import { ICreateTaskDTO } from "modules/task/dtos/ICreateTaskDTO";
import { ITasksRepository } from "modules/task/repositories/ITasksRepository";
import { IDayJSProvider } from "shared/container/providers/DayJSProvider/repositories/IDayJSProvider";
import { AppError } from "shared/http/errors/AppError";
import { inject, injectable } from "tsyringe";
import { v4 } from "uuid";

@injectable()
class CreateTaskUseCase {
  constructor(
    @inject("DayJSProvider")
    private dayJSProvider: IDayJSProvider,
    @inject("TasksRepository")
    private tasksRepository: ITasksRepository,
  ) {}

  async execute({ userId, content, forecastDate }: ICreateTaskDTO): Promise<void> {
    const createdDate = this.dayJSProvider.dateNow();

    const forecastDateUnix = this.dayJSProvider.converteDateToUnix(forecastDate);

    const id = v4();

    try {
      await this.tasksRepository.create({
        id, userId, content, createdDate, forecastDate: forecastDateUnix,
      });
    } catch (error) {
      throw new AppError(error.message);
    }
  }
}

export { CreateTaskUseCase };
