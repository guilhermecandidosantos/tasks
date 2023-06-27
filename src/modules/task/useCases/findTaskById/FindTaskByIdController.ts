import { Request, Response } from "express";
import { container } from "tsyringe";

import { FindTaskByIdUseCase } from "./FindTaskByIdUseCase";

class FindTaskByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findTaskByIdUseCase = container.resolve(FindTaskByIdUseCase);

    try {
      const task = await findTaskByIdUseCase.execute(id);

      return response.status(200).json(task);
    } catch (error) {
      return response.status(error.statusCode).json({ message: error.message });
    }
  }
}

export { FindTaskByIdController };
