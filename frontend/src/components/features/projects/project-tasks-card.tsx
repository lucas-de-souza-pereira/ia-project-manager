import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Task } from "@/types/task";
import { User } from "@/types/user";
import { Calendar } from "@/components/icons";
import { formatFrenchDate } from "@/lib/utils";
import { UserChip } from "@/components/shared/user-chip";
import { CommentsSection } from "./comments/comments-section";

interface ProjectTasksCardProps {
  task: Task;
  currentUser: User;
}

export default function ProjectTasksCard({
  task,
  currentUser,
}: ProjectTasksCardProps) {
  const onAddComment = (content: string) => {
    console.log(content);
  };

  return (
    <Card>
      <CardHeader>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
      </CardHeader>
      <CardContent>
        <p>Échéance :</p>
        <p>
          <Calendar className="w-3.75 h-4" /> {formatFrenchDate(task.dueDate)}
        </p>

        <div className="flex">
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

        <span className="w-full border-b border-border"></span>

        <div className="flex items-center justify-between">
          <CommentsSection
            comments={task.comments}
            onAddComment={onAddComment}
          />
        </div>
      </CardContent>
    </Card>
  );
}
