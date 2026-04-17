import { LoadingState } from "@/components/shared/states/loading-state";

export default function Loading() {
  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <LoadingState />
    </div>
  );
}
