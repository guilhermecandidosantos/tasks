import { Request, Response } from "express";
import { container } from "tsyringe";

import { RefreshTokenUseCase } from "./RefreshTokenUseCase";

class RefreshTokenController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { refresh_token } = request.body;

    const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);

    try {
      const tokens = await refreshTokenUseCase.execute(refresh_token);

      return response.status(200).json(tokens);
    } catch (error) {
      return response.status(error.statusCode).json({ message: error.message });
    }
  }
}

export { RefreshTokenController };
