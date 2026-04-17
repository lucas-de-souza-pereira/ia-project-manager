"use client";

import { useState } from "react";
import { isSameDay, parseISO } from "date-fns";
import { fr } from "date-fns/locale";

import { Calendar } from "@/components/ui/calendar";
import { type Task } from "@/types/task";
import { type User } from "@/types/user";
import ProjectTasksCard from "./project-tasks-card";
import { cn } from "@/lib/utils";

interface ProjectTasksCalendarProps {
  tasks: Task[];
  currentUser: User;
}

export default function ProjectTasksCalendar({
  tasks,
  currentUser,
}: ProjectTasksCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );

  const tasksForSelectedDate = tasks.filter((task) => {
    if (!selectedDate || !task.dueDate) return false;
    return isSameDay(parseISO(task.dueDate), selectedDate);
  });

  const daysWithTasks = tasks
    .filter((task) => task.dueDate)
    .map((task) => parseISO(task.dueDate));

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start mt-8">
      <div className="bg-card rounded-xl border border-border p-4 shadow-sm shrink-0 mx-auto lg:mx-0 w-full max-w-[350px]">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          locale={fr}
          className="rounded-md border-0"
          style={{
            //@ts-ignore - Variable CSS custom
            "--cell-size": "43px",
          }}
          modifiers={{
            hasTasks: daysWithTasks,
          }}
          modifiersClassNames={{
            hasTasks:
              "font-bold text-primary relative after:content-[''] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-primary after:rounded-full",
          }}
        />
      </div>

      <div className="flex-1 w-full flex flex-col gap-y-4 min-w-0">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold">
            {selectedDate
              ? `Tâches du ${selectedDate.toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}`
              : "Sélectionnez une date"}
          </h3>
          <span className="text-sm text-muted-foreground">
            {tasksForSelectedDate.length}{" "}
            {tasksForSelectedDate.length > 1 ? "tâches" : "tâche"}
          </span>
        </div>

        {tasksForSelectedDate.length > 0 ? (
          <div className="flex flex-col gap-y-4 pb-4 custom-scrollbar">
            {tasksForSelectedDate.map((task) => (
              <div key={task.id} className="w-full shrink-0">
                <ProjectTasksCard
                  key={task.id}
                  task={task}
                  currentUser={currentUser}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-12 border border-dashed border-border rounded-xl bg-muted/30 text-center">
            <p className="text-muted-foreground">
              Aucune tâche d'échéance ce jour-là.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
