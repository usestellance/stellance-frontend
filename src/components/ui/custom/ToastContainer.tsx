'use client'
import React from "react";
import ToastItem from "./Toast";
import { useToastStore } from "../../../store/useToastStore";

const ToastContainer: React.FC = () => {
  const toasts = useToastStore((state) => state.toasts);

  return (
    <div className="fixed w-full max-w-[307px] top-[30px] right-0 z-50 flex flex-col gap-3">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  );
};

export default ToastContainer;
