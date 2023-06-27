import { Router } from "express";

import { ensureAuthentication } from "../middlewares/ensureAuthentication";
import { taskRoutes } from "./task.routes";
import { userRoutes } from "./user.routes";

const routes = Router();

routes.use("/user", userRoutes);
routes.use("/task", ensureAuthentication, taskRoutes);

export { routes };
