import { Router } from "express";
import { LoginWithGitHubController } from "modules/account/useCases/loginWithGitHub/LoginWithGitHubController";

const userRoutes = Router();

const loginWithGitHubController = new LoginWithGitHubController();

userRoutes.post("/register", loginWithGitHubController.handle);

export { userRoutes };
