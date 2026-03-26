export interface Task {
  title: string;
  description: string;
  status: "todo" | "doing" | "done";
  dueDate: string;
  commentsCount: number;
  project: {
    name: string;
  };
}
