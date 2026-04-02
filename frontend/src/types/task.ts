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
    user: {
      id: string;
      email: string;
      name: string;
    };
  }[];
  comments: {
    id: string;
    content: string;
    author: {
      name: string;
    };
  }[];
  createdAt: string;
}

export interface AssignedTask extends Task {
  project: {
    name: string;
  };
  commentsCount: number;
}
