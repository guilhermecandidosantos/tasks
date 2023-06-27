import { Request, Response } from "express";
import { container } from "tsyringe";

import { MarkCompletedTaskUseCase } from "./MarkCompletedTaskUseCase";

class MarkCompletedTaskController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const markCompletedTaskUseCase = container.resolve(MarkCompletedTaskUseCase);

    try {
      const task = await markCompletedTaskUseCase.execute(id);

      return response.status(200).json(task);
    } catch (error) {
      return response.status(error.statusCode).json({ message: error.message });
    }
  }
}

export { MarkCompletedTaskController };
