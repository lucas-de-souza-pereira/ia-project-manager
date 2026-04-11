import { Badge } from "@/components/ui/badge";
import type { ReactNode } from "react";

interface KanbanColumnProps<T extends { id: string, status: string }> {
  title: string;
  tasks: T[]
  status: T["status"]
  renderCard: (item: T) => ReactNode;
}

export function KanbanColumn<T extends { id: string, status: string }>
({ title, tasks, status, renderCard }: KanbanColumnProps<T>) {
  const filteredItems = tasks.filter((t) => t.status === status);

  return (
    <div className="w-full flex-1 md:overflow-x-auto md:bg-card md:rounded-lg md:border md:border-border p-1.5 md:p-6 py-3.5 md:py-10">
      <div className="flex flex-row gap-x-2 items-center">
        <h3 className="text-lg">{title}</h3>
        <Badge variant="muted" className="h-6.25">
          {filteredItems.length}
        </Badge>
      </div>

      <div className="flex flex-col gap-y-3.25 md:gap-y-4.5 md:flex-row md:gap-x-4.5 xl:flex-col xl:gap-y-4.5 mt-4.5 md:mt-10.25">
        {filteredItems.map((item) => (
          <div key={item.id} className=" md:w-[300px] shrink-0 xl:w-full">
            {renderCard(item)}
          </div>
        ))}
      </div>
    </div>
  );
}