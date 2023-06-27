import { Request, Response } from "express";
import { container } from "tsyringe";

import { FindAllTasksUseCase } from "./FindAllTasksUseCase";

class FindAllTasksController {
  async handle(request: Request, response: Response): Promise<Response> {
    const findAllTasksUseCase = container.resolve(FindAllTasksUseCase);

    try {
      const tasks = await findAllTasksUseCase.execute();

      return response.status(200).json(tasks);
    } catch (error) {
      return response.status(error.statusCode).json({ message: error.message });
    }
  }
}

export { FindAllTasksController };
