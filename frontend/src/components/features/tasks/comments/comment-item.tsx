import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getUserInitials } from "@/lib/utils";
import { type Comment } from "@/types/comment";
import { formatFrenchDateWithHour } from "@/lib/utils";

export function CommentItem({ comment }: { comment: Comment }) {
  return (
    <article className="flex gap-x-3.5 w-full">
      <Avatar aria-hidden="true" className="hidden md:block">
        <AvatarFallback className="text-[#0F0F0F] text-[10px] border border-card">
          {getUserInitials(comment.author.name)}
        </AvatarFallback>
      </Avatar>
      <div className="grid grid-cols-2 gap-y-2 w-full items-center bg-[#F3F4F6] rounded-lg py-4.5 px-3.5">
        <h5 className="text-foreground">{comment.author.name}</h5>
        <time
          dateTime={comment.createdAt}
          className="text-[10px] text-right"
          aria-label={`Posté le ${formatFrenchDateWithHour(comment.createdAt)}`}
        >
          {formatFrenchDateWithHour(comment.createdAt)}
        </time>
        <p className="text-foreground  text-xs md:text-[10px] col-span-2">
          {comment.content}
        </p>
      </div>
    </article>
  );
}
