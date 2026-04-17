"use client";

import { Comment } from "@/types/comment";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "@/components/icons";
import { CommentItem } from "./comment-item";
import { CommentForm } from "./comment-form";

interface CommentsSectionProps {
  comments: Comment[];
  onAddComment: (content: string) => void;
}

export function CommentsSection({
  comments,
  onAddComment,
}: CommentsSectionProps) {
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const listId = `comments-list-${comments.length}`;
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="text-sm text-heading font-normal">
          Commentaires ({comments.length})
        </h4>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCommentsOpen(!isCommentsOpen)}
          aria-expanded={isCommentsOpen}
          aria-controls={listId}
          aria-label={
            isCommentsOpen
              ? "Masquer les commentaires"
              : "Afficher les commentaires"
          }
        >
          {isCommentsOpen ? (
            <ChevronUp className="w-4 h-2" />
          ) : (
            <ChevronDown className="w-4 h-2" />
          )}
        </Button>
      </div>

      {isCommentsOpen && (
        <div id={listId} className="space-y-4">
          <ul className="flex flex-col gap-4">
            {comments.map((comment) => (
              <li key={comment.id}>
                <CommentItem comment={comment} />
              </li>
            ))}
          </ul>
          <CommentForm onAddComment={onAddComment} />
        </div>
      )}
    </div>
  );
}
