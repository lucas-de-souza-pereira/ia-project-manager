import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
} from "@/components/ui/card";

import { Task } from "@/types/task";
import { User } from "@/types/user";
import { Calendar, Ellipsis } from "@/components/icons";
import { formatFrenchDate } from "@/lib/utils";
import { UserChip } from "@/components/shared/user-chip";
import { CommentsSection } from "./comments/comments-section";
import { Badge } from "@/components/ui/badge";
import { TASK_STATUS_DICT } from "@/config/task-status";
import { Button } from "@/components/ui/button";
import { deleteTaskAction } from "@/lib/actions/tasks";
import { addCommentAction } from "@/lib/actions/comments";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface ProjectTasksCardProps {
  task: Task;
  currentUser: User;
}

export default function ProjectTasksCard({
  task,
  currentUser,
}: ProjectTasksCardProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const onEdit = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("modal", "update-task");
    params.set("taskId", task.id);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };
  const onDelete = () => {
    deleteTaskAction(task.projectId, task.id);
  };

  const onAddComment = (content: string) => {
    addCommentAction({
      content,
      taskId: task.id,
      projectId: task.projectId,
    });
  };
  const statusConfig = TASK_STATUS_DICT[task.status];

  return (
    <Card className="py-4.5 px-6 xl:py-6.25 xl:px-10 h-full flex flex-col justify-between">
      <CardHeader className="p-0 md:p-0 lg:p-0">
        <div className="flex items-center gap-x-2">
          <h3>{task.title}</h3>
          <Badge className={statusConfig.tailwindClasses}>
            {statusConfig.label}
          </Badge>
        </div>
        <p>{task.description}</p>
        <CardAction>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="border border-border w-14 h-14"
                />
              }
            >
              <Ellipsis className="w-3.75 h-1" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onEdit}>Modifier</DropdownMenuItem>
              <DropdownMenuItem onClick={onDelete} className="text-destructive">
                Supprimer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardAction>
      </CardHeader>
      <CardContent className="p-0 md:p-0 lg:p-0">
        <div className="flex gap-x-1 items-center text-xs">
          <p>Échéance :</p>
          <div className="flex text-[#1F1F1F] items-center gap-x-2">
            <Calendar className="w-3.75 h-4" />
            <p className="text-[#1F1F1F]">{formatFrenchDate(task.dueDate)}</p>
          </div>
        </div>

        <div className="flex mt-6 items-center gap-x-2">
          <p>Assigné à :</p>
          {task.assignees?.map((assignee) => (
            <UserChip
              key={assignee.user.id}
              user={assignee.user}
              currentUserId={currentUser.id}
              variant="name"
            />
          ))}
        </div>

        <hr className="mt-6 border-border" />

        <div className="mt-6">
          <CommentsSection
            comments={task.comments}
            onAddComment={onAddComment}
          />
        </div>
      </CardContent>
    </Card>
  );
}
