import DashboardTaskCard from "../tasks/dashboard-task-card";
import { type AssignedTask } from "@/types/task";

// components shadcn
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

// icons
import { Search } from "@/components/icons";

interface TaskListViewProps {
  tasks: AssignedTask[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function TaskListView({
  tasks,
  searchQuery,
  onSearchChange,
}: TaskListViewProps) {
  return (
    <div className="md:bg-card md:rounded-lg md:border md:border-border p-1.5 md:p-14.75">
      <div className="flex flex-col gap-y-4.5 items-start md:flex-row md:items-center justify-between">
        <div className="flex flex-col items-start gap-y-2 mt-2 md:mt-0">
          <h2>Mes tâches assignées</h2>
          <p>Par ordre de priorité</p>
        </div>
        <InputGroup className="h-11 w-full max-w-[357px] px-8 py-5.75 bg-primary-foreground border-input rounded-md group-focus-within:ring-2 group-focus-within:ring-primary/20 transition-all">
          <InputGroupInput
            aria-label="Rechercher une tâche par son titre"
            placeholder="Rechercher une tâche"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="placeholder:text-muted-foreground/50 text-sm text-card-foreground"
          />
          <InputGroupAddon align="inline-end" className="">
            <Search
              className="h-3.5 w-3.5 text-muted-foreground opacity-50"
              aria-hidden="true"
            />
          </InputGroupAddon>
        </InputGroup>
      </div>

      <div aria-live="polite" className="sr-only">
        {tasks.length} tâches trouvées pour vos critères de recherche.
      </div>

      <ul className="flex flex-col gap-y-3.25 md:gap-y-4.25 mt-4.5 md:mt-6 lg:mt-10">
        {tasks.map((task) => (
          <li key={task.id}>
            <DashboardTaskCard task={task} variant="list" />
          </li>
        ))}
      </ul>
    </div>
  );
}
