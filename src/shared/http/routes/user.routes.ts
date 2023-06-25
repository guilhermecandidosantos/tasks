import { Router } from "express";
import { LoginWithGitHubController } from "modules/account/useCases/loginWithGitHub/LoginWithGitHubController";
import { RefreshTokenController } from "modules/account/useCases/refreshToken/RefreshTokenController";

const userRoutes = Router();

const loginWithGitHubController = new LoginWithGitHubController();
const refreshTokenController = new RefreshTokenController();

userRoutes.post("/register", loginWithGitHubController.handle);

userRoutes.post("/refresh_token", refreshTokenController.handle);

export { userRoutes };
