import DashboardTaskCard from "./dashboard-task-card";

export default function TaskListView() {
  return (
    <div className="md:bg-card md:rounded-lg md:border md:border-border p-5 md:p-14.75">
      <div className="flex flex-col gap-y-4.5 items-start md:flex-row md:items-center justify-between">
        <div className="flex flex-col items-start">
          <h2>Mes tâches assignées</h2>
          <p>Par ordre de priorité</p>
        </div>
        <input type="text" placeholder="Rechercher" />
      </div>

      <DashboardTaskCard
        task={{
          title: "Tâche 1",
          description: "Description de la tâche 1",
          status: "todo",
          dueDate: "2022-01-01",
          commentsCount: 0,
          project: {
            name: "Projet 1",
          },
        }}
      />

      <DashboardTaskCard
        task={{
          title: "Tâche 2",
          description: "Description de la tâche 2",
          status: "doing",
          dueDate: "2022-01-02",
          commentsCount: 1,
          project: {
            name: "Projet 2",
          },
        }}
      />

      <DashboardTaskCard
        task={{
          title: "Tâche 3",
          description: "Description de la tâche 3",
          status: "done",
          dueDate: "2022-01-03",
          commentsCount: 2,
          project: {
            name: "Projet 3",
          },
        }}
      />
    </div>
  );
}
