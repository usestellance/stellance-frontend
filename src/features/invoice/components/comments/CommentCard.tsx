import React from "react";
import { formatTimeAgo } from "../../../../lib/utils/helpers";
import { Comment } from "../../../../types/invoiceTypes";
import { useAuthStore } from "../../../../store/userAuthStore";

type CommentCardProps = {
  comment: Comment;
};

const CommentCard = ({ comment }: CommentCardProps) => {
  const { credentials } = useAuthStore();
  const { commenter_name, comment_text, created_at, commenter_email } = comment;
  const isCurrentUserComment =
    credentials?.user?.profile?.email === commenter_email;
  // console.log(isCurrentUserComment);

  return (
    <div
      className={`bg-neutral-comment rounded-[5px] px-2.5 py-[11px] sm:px-5 sm:py-5 ${isCurrentUserComment ? "border-l-4 border-primary-500" : ""}`}
    >
      <div className="flex justify-between items-center">
        <p className="font-medium text-xs sm:text-lg">
          {isCurrentUserComment ? "Me" : commenter_name}
        </p>

        <p className="text-neutral-800 text-xs sm:text-sm">
          {formatTimeAgo(created_at)}
        </p>
      </div>

      <div className="text-xs mt-[5px] sm:text-lg">{comment_text}</div>
    </div>
  );
};

export default CommentCard;
