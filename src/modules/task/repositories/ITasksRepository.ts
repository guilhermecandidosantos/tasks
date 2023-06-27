import { IEditTaskDTO } from "../dtos/IEditTaskDTO";
import { IMarkCompletedTaskDTO } from "../dtos/IMarkCompletedTaskDTO";
import { Task } from "../entities/Task";

interface ITasksRepository {
  create({
    id, userId, content, createdDate, forecastDate,
  }: Task): Promise<void>;
  editTask({ id, content, forecastDate }: IEditTaskDTO): Promise<Task>;
  markCompletedTask({ id, completedDate }: IMarkCompletedTaskDTO): Promise<Task>;
  deleteTask(id: string): Promise<void>;
  findAllTasks(userId: string): Promise<Task[]>;
  findTaskById(id: string): Promise<Task>;
}

export { ITasksRepository };
