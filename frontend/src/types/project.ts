import { AssignedTask } from "./task";

export interface ProjectMember {
  id: string;
  role: string;
  joinedAt: string;
  userId: string;
  projectId: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  ownerId: string;
  owner: {
    id: string;
    email: string;
    name: string;
  };
  members: ProjectMember[];
  _count: {
    tasks: number;
  };
  userRole: string;
  progress?: number;
  completedTasksCount?: number;
}

export interface ProjectWithTasks extends Project {
  tasks: AssignedTask[];
}
