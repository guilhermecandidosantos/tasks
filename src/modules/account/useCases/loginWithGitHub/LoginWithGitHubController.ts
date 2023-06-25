import { Request, Response } from "express";
import { gitHubOAuth } from "lib/gitHubOAuth";
import { container } from "tsyringe";

import { LoginWithGitHubUseCase } from "./LoginWithGitHubUseCase";

class LoginWithGitHubController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { code } = request.body;

    const loginWithGitHubUseCase = container.resolve(LoginWithGitHubUseCase);

    try {
      const { gitHubId, username, avatarUrl } = await gitHubOAuth(code);

      const tokens = await loginWithGitHubUseCase.execute({
        gitHubId, username, avatarUrl,
      });

      return response.status(200).json({ tokens });
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }
}

export { LoginWithGitHubController };
