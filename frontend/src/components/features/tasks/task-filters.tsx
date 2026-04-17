"use client";

// Composants UI Shadcn
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

// icons
import { Search, ChevronDown } from "@/components/icons";

interface TaskFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
}

const statusOptions = [
  { value: "ALL", label: "Statut" },
  { value: "TODO", label: "À faire" },
  { value: "IN_PROGRESS", label: "En cours" },
  { value: "DONE", label: "Terminé" },
];

export function TaskFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
}: TaskFiltersProps) {
  const currentStatusLabel =
    statusOptions.find((opt) => opt.value === statusFilter)?.label || "Statut";

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
      {/* Sélecteur de Statut */}
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="outline"
              className="px-8 py-5.75 justify-between w-full sm:w-[152px] font-normal text-muted-foreground hover:text-foreground transition-colors border-input rounded-md bg-primary-foreground"
              aria-label="Filtrer par statut"
            />
          }
        >
          <span className="truncate text-card-foreground text-sm">
            {currentStatusLabel}
          </span>
          <ChevronDown
            className="ml-2 h-4 w-2 shrink-0 opacity-50"
            aria-hidden="true"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="md:w-[152px] bg-white border-border">
          <DropdownMenuRadioGroup
            value={statusFilter}
            onValueChange={onStatusChange}
            aria-label={
              statusFilter === "ALL"
                ? "Tous les statuts"
                : `Statut : ${currentStatusLabel}`
            }
          >
            {statusOptions.map((opt) => (
              <DropdownMenuRadioItem
                key={opt.value}
                value={opt.value}
                className="cursor-pointer"
              >
                {opt.label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Barre de Recherche */}
      <InputGroup className="h-11 w-full sm:w-[283px] px-8 py-5.75 bg-primary-foreground border-input rounded-md group-focus-within:ring-2 group-focus-within:ring-primary/20 transition-all">
        <InputGroupInput
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
  );
}
