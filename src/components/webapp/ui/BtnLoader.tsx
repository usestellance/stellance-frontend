import React from "react";
import { ImSpinner2 } from "react-icons/im";

const BtnLoader = () => {
  return (
    <div className="animate-spin text-inherit duration-50">
      <ImSpinner2 size={24} className="mx-auto" />
    </div>
  );
};

export default BtnLoader;
