import { type Comment } from "./comment";
import { type User } from "./user";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  priority: "LOW" | "MEDIUM" | "HIGH";
  dueDate: string;
  projectId: string;
  creatorId: string;
  assignees: {
    id: string;
    userId: string;
    user: User;
  }[];
  comments: Comment[];
  createdAt: string;
}

export interface AssignedTask extends Task {
  project: {
    name: string;
  };
  commentsCount: number;
}

export interface CreateTaskData {
  title: string;
  description: string;
  dueDate: string;
  status: string;
  assigneeIds: string[];
}
