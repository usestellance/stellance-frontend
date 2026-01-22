import React from "react";
import CommentCard from "./CommentCard";
import { Textarea } from "../../../../components/ui/textarea";
import { Button } from "../../../../components/ui/button";

const CommentsPreview = () => {
  return (
    <div>
      <section className="flex justify-between">
        <h3 className="text-lg sm:text-3xl">Team Comments</h3>
        <div className="min-h-[30px] min-w-[30px] sm:min-w-10 sm:min-h-10 rounded-full flex justify-center items-center bg-primary-50 font-bold text-xs sm:text-base p-2 aspect-square">
          3
        </div>
      </section>

      <section className="space-y-4 mt-5 sm:space-y-8 sm:mt-12">
        <CommentCard />
        <CommentCard />
        <CommentCard />
        <CommentCard />
      </section>

      <section className="mt-[15px] sm:mt-10 flex flex-col">
        <Textarea
          className="max-h-40"
          placeholder="Add comment..."
          maxLength={150}
        />
        <Button className="mt-5 rounded-[10px] max-w-20 text-sm sm:mt-10 sm:max-w-[244px] place-self-end">
          Post
        </Button>
      </section>
    </div>
  );
};

export default CommentsPreview;
