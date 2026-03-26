import DashboardView from "@/components/features/tasks/dashboard-view";
import { type Task } from "@/types/task";

const mockTasks: Task[] = [
  {
    title: "Tâche 1",
    description: "Description de la tâche 1",
    status: "todo",
    dueDate: "2024-03-28",
    commentsCount: 3,
    project: { name: "Projet 1" },
  },
  {
    title: "Tâche 2",
    description: "Description de la tâche 2",
    status: "doing",
    dueDate: "2024-03-30",
    commentsCount: 1,
    project: { name: "Projet 2" },
  },
  {
    title: "Tâche 3",
    description: "Description de la tâche 3",
    status: "done",
    dueDate: "2024-03-25",
    commentsCount: 5,
    project: { name: "Projet 1" },
  },
  {
    title: "Tâche 1",
    description: "Description de la tâche 1",
    status: "todo",
    dueDate: "2024-03-28",
    commentsCount: 3,
    project: { name: "Projet 1" },
  },
  {
    title: "Tâche 2",
    description: "Description de la tâche 2",
    status: "doing",
    dueDate: "2024-03-30",
    commentsCount: 1,
    project: { name: "Projet 2" },
  },
  {
    title: "Tâche 3",
    description: "Description de la tâche 3",
    status: "done",
    dueDate: "2024-03-25",
    commentsCount: 5,
    project: { name: "Projet 1" },
  },
  {
    title: "Tâche 1",
    description: "Description de la tâche 1",
    status: "todo",
    dueDate: "2024-03-28",
    commentsCount: 3,
    project: { name: "Projet 1" },
  },
  {
    title: "Tâche 2",
    description: "Description de la tâche 2",
    status: "doing",
    dueDate: "2024-03-30",
    commentsCount: 1,
    project: { name: "Projet 2" },
  },
  {
    title: "Tâche 3",
    description: "Description de la tâche 3",
    status: "done",
    dueDate: "2024-03-25",
    commentsCount: 5,
    project: { name: "Projet 1" },
  },
  {
    title: "Tâche 1",
    description: "Description de la tâche 1",
    status: "todo",
    dueDate: "2024-03-28",
    commentsCount: 3,
    project: { name: "Projet 1" },
  },
  {
    title: "Tâche 2",
    description: "Description de la tâche 2",
    status: "doing",
    dueDate: "2024-03-30",
    commentsCount: 1,
    project: { name: "Projet 2" },
  },
  {
    title: "Tâche 3",
    description: "Description de la tâche 3",
    status: "done",
    dueDate: "2024-03-25",
    commentsCount: 5,
    project: { name: "Projet 1" },
  },
  {
    title: "Tâche 1",
    description: "Description de la tâche 1",
    status: "todo",
    dueDate: "2024-03-28",
    commentsCount: 3,
    project: { name: "Projet 1" },
  },
  {
    title: "Tâche 2",
    description: "Description de la tâche 2",
    status: "doing",
    dueDate: "2024-03-30",
    commentsCount: 1,
    project: { name: "Projet 2" },
  },
  {
    title: "Tâche 3",
    description: "Description de la tâche 3",
    status: "done",
    dueDate: "2024-03-25",
    commentsCount: 5,
    project: { name: "Projet 1" },
  },
];

export default function DashboardPage() {
  return (
    <div>
      <DashboardView user={{ name: "Lucas" }} tasks={mockTasks} />
    </div>
  );
}
