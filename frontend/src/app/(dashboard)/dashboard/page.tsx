import DashboardView from "@/components/features/tasks/dashboard-view";

export default function DashboardPage() {
  return (
    <div className="mt-8 md:mt-12 xl:mt-22 w-11/12 xl:w-[1215px] mx-auto">
      <DashboardView user={{ name: "Lucas" }} />
    </div>
  );
}
