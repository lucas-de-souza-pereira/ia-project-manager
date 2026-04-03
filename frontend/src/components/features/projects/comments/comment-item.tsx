import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getUserInitials } from "@/lib/utils";
import { type Comment } from "@/types/comment";
import { formatFrenchDateWithHour } from "@/lib/utils";

export function CommentItem({ comment }: { comment: Comment }) {
  return (
    <div className="flex gap-x-3.5 w-full">
      <Avatar>
        <AvatarFallback>{getUserInitials(comment.author.name)}</AvatarFallback>
      </Avatar>
      <div className="flex justify-between bg-[#F3F4F6] rounded-lg py-4.5 px-3.5">
        <div className="flex flex-col gap-y-4.5 ">
          <h4>{comment.author.name}</h4>
          <p>{comment.content}</p>
        </div>
        <p>{formatFrenchDateWithHour(comment.createdAt)}</p>
      </div>
    </div>
  );
}
