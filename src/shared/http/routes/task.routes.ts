import { Router } from "express";
import { CreateTaskController } from "modules/task/useCases/createTask/CreateTaskController";
import { DeleteTaskController } from "modules/task/useCases/deleteTask/DeleteTaskController";
import { EditTaskController } from "modules/task/useCases/editTask/EditTaskController";
import { FindAllTasksController } from "modules/task/useCases/findAllTasks/FindAllTasksController";
import { FindTaskByIdController } from "modules/task/useCases/findTaskById/FindTaskByIdController";
import { MarkCompletedTaskController } from "modules/task/useCases/markCompletedTask/MarkCompletedTaskController";

const taskRoutes = Router();

const findAllTasksController = new FindAllTasksController();
const findTaskByIdController = new FindTaskByIdController();
const createTaskController = new CreateTaskController();
const editTaskController = new EditTaskController();
const markCompletedTaskController = new MarkCompletedTaskController();
const deleteTaskController = new DeleteTaskController();

taskRoutes.get("/all", findAllTasksController.handle);
taskRoutes.get("/:id", findTaskByIdController.handle);
taskRoutes.post("/create", createTaskController.handle);
taskRoutes.put("/:id/edit", editTaskController.handle);
taskRoutes.patch("/:id/completed", markCompletedTaskController.handle);
taskRoutes.delete("/:id/delete", deleteTaskController.handle);

export { taskRoutes };
