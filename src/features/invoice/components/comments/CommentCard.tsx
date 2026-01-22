import React from "react";

const CommentCard = () => {
  return (
    <div className="bg-neutral-comment rounded-[5px] px-2.5 py-[11px] sm:px-5 sm:py-5">
      <div className="flex justify-between items-center">
        <p className="font-medium text-xs sm:text-lg">Tubo Laye</p>
        <p className="text-neutral-800 text-xs sm:text-sm">2h ago</p>
      </div>
      <div className="text-xs mt-[5px] sm:text-lg">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
        doloremque officia deleniti dolore. Ullam deserunt accusamus modi
        inventore unde omnis!
      </div>
    </div>
  );
};

export default CommentCard;
