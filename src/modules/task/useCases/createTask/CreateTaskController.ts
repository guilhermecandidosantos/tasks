import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateTaskUseCase } from "./CreateTaskUseCase";

class CreateTaskController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { content, forecastDate } = request.body;
    const { id: userId } = request.user;

    const createTaskUseCase = container.resolve(CreateTaskUseCase);

    try {
      await createTaskUseCase.execute({ userId, content, forecastDate });

      return response.status(201).json({ message: "created successfully" });
    } catch (error) {
      return response.status(error.statusCode).json({ message: error.message });
    }
  }
}

export { CreateTaskController };
