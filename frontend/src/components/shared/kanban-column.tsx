import { Badge } from "@/components/ui/badge";
import type { ReactNode } from "react";

interface KanbanColumnProps<T extends { id: string; status: string }> {
  title: string;
  tasks: T[];
  status: T["status"];
  renderCard: (item: T) => ReactNode;
}

export function KanbanColumn<T extends { id: string; status: string }>({
  title,
  tasks,
  status,
  renderCard,
}: KanbanColumnProps<T>) {
  const filteredItems = tasks.filter((t) => t.status === status);
  const columnId = `kanban-col-${status}`;

  return (
    <section
      className="w-full flex-1 md:overflow-x-auto md:bg-card md:rounded-lg md:border md:border-border p-1.5 md:p-6 py-3.5 md:py-10"
      aria-labelledby={columnId}
    >
      <div className="flex flex-row gap-x-2 items-center">
        <h2 className="text-lg" id={columnId}>
          {title}
        </h2>
        <Badge
          variant="muted"
          className="h-6.25"
          aria-label={`${filteredItems.length} tâches dans cette colonne`}
        >
          {filteredItems.length}
        </Badge>
      </div>

      <ul className="flex flex-col gap-y-3.25 md:gap-y-4.5 md:flex-row md:gap-x-4.5 xl:flex-col xl:gap-y-4.5 mt-4.5 md:mt-10.25">
        {filteredItems.map((item) => (
          <li key={item.id} className=" md:w-[300px] shrink-0 xl:w-full">
            {renderCard(item)}
          </li>
        ))}
      </ul>
    </section>
  );
}
