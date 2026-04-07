import { type Task } from "./task";
import { type User } from "./user";

export interface ProjectMember {
  id: string;
  role: string;
  joinedAt: string;
  userId: string;
  projectId: string;
  user: User;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  ownerId: string;
  owner: User;
  members: ProjectMember[];
  _count: {
    tasks: number;
  };
  userRole: string;
  progress?: number;
  completedTasksCount?: number;
}

export interface ProjectWithTasks extends Project {
  tasks: Task[];
}
