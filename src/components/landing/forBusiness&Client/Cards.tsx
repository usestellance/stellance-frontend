import React, { FC } from "react";

interface CardsProps {
  title: string;
  description: string;
  gradient: string;
}

const Cards: FC<CardsProps> = ({ title, description, gradient }) => {
  return (
    <div
      className={`max-sm:h-[248px] h-[456px] ${gradient} bg-gradient-to-r px-5 pt-4 pb-6 sm:px-10 sm:py-8 flex flex-col justify-between`}
    >
      <div className="font-medium sm:text-[20px]">{title}</div>
      <div className="text-primary font-bold  text-base sm:text-[24px]">
        {description}
      </div>
    </div>
  );
};

export default Cards;
