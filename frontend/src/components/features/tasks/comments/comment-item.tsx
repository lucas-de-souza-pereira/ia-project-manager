import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getUserInitials } from "@/lib/utils";
import { type Comment } from "@/types/comment";
import { formatFrenchDateWithHour } from "@/lib/utils";

export function CommentItem({ comment }: { comment: Comment }) {
  return (
    <div className="flex gap-x-3.5 w-full">
      <Avatar>
        <AvatarFallback className="text-[#0F0F0F] text-[10px] border border-card">{getUserInitials(comment.author.name)}</AvatarFallback>
      </Avatar>
      <div className="grid grid-cols-2 gap-y-2 w-full items-center bg-[#F3F4F6] rounded-lg py-4.5 px-3.5">
          <h5 className="text-foreground">{comment.author.name}</h5>
          <p className="text-[10px] text-right">{formatFrenchDateWithHour(comment.createdAt)}</p>
          <p className="text-foreground text-[10px] col-span-2">{comment.content}</p>
      </div>
    </div>
  );
}
