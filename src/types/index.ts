export interface Task {
  id: string;
  title: string;
  description: string;
  done: boolean;
  createdAt: number;
  userId: string;
}

export interface UserCredentials {
  email: string;
  password: string;
}
