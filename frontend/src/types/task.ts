export interface AssignedTask {
  id: string;
  title: string;
  description: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  status: "TODO" | "IN_PROGRESS" | "DONE";
  dueDate: string;
  projectId: string;
  commentsCount: number;
  comments: [{ id: string }];
  project: {
    name: string;
  };
}
