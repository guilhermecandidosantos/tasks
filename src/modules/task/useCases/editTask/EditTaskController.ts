import { Request, Response } from "express";
import { container } from "tsyringe";

import { EditTaskUseCase } from "./EditTaskUseCase";

class EditTaskController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { content, forecastDate } = request.body;
    const { id } = request.params;

    const editTaskUseCase = container.resolve(EditTaskUseCase);

    try {
      const task = await editTaskUseCase.execute({ id, content, forecastDate });

      return response.status(200).json(task);
    } catch (error) {
      return response.status(error.statusCode).json({ message: error.message });
    }
  }
}

export { EditTaskController };
