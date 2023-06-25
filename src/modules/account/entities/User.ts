import { v4 } from "uuid";

class User {
  id?: string;
  gitHubId: number;
  username: string;
  avatarUrl: string;
  createdAt?: number;
}

export { User };
