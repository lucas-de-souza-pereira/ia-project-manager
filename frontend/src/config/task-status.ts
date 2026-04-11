import { AssignedTask } from "@/types/task";



export const TASK_STATUS_DICT: Record<
  AssignedTask["status"],
  { label: string; tailwindClasses: string }
> = {
  TODO: {
    label: "À faire",
    tailwindClasses: "bg-[#FFE0E0] text-[#EF4444]",
  },
  IN_PROGRESS: {
    label: "En cours",
    tailwindClasses: "bg-[#FFF0D7] text-[#E08D00]",
  },
  DONE: {
    label: "Terminée",
    tailwindClasses: "bg-[#F1FFF7] text-[#27AE60]",
  },
} as const;

export const KANBAN_COLUMNS = [
  { status: "TODO", title: TASK_STATUS_DICT.TODO.label },
  { status: "IN_PROGRESS", title: TASK_STATUS_DICT.IN_PROGRESS.label },
  { status: "DONE", title: TASK_STATUS_DICT.DONE.label },
] as const; 