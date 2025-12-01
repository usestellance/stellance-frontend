import React from "react";
import { IoMdCheckmarkCircle } from "react-icons/io";
import {  MdWarning, MdInfo } from "react-icons/md";
import { Toast } from "../../../store/useToastStore"; // ✅ Import Toast, not ToastType

const toastConfig = {
  success: {
    bg: "bg-success-50",
    bar: "bg-success-500",
    text: "text-success-500",
    icon: IoMdCheckmarkCircle,
  },
  error: {
    bg: "bg-error-50",
    bar: "bg-error-500",
    text: "text-error-500",
    // icon: MdError,
    icon: MdWarning,
  },
  warning: {
    bg: "bg-warning-50",
    bar: "bg-warning-500",
    text: "text-warning-500",
    icon: MdWarning,
  },
  info: {
    bg: "bg-primary-50",
    bar: "bg-primary-500",
    text: "text-primary-500",
    icon: MdInfo,
  },
};

interface ToastItemProps {
  toast: Toast; // ✅ Use Toast interface
}

const ToastItem: React.FC<ToastItemProps> = ({ toast }) => {
//   const removeToast = useToastStore((state) => state.removeToast);
  const config = toastConfig[toast.type];
  const Icon = config.icon;

  return (
    <div
      className={`h-[65px] w-full  rounded-tl-[12px] rounded-bl-[12px] px-5 py-2 flex items-center gap-5 ${config.bg} shadow-md animate-in slide-in-from-right duration-300`}
    >
      <div className={`w-[7px] h-[49px] ${config.bar} rounded-full`}></div>
      <div className={`${config.text} flex items-center gap-2.5 flex-1`}>
        <Icon size={24} />
        <span className="text-sm font-medium line-clamp-2">
          {toast.message}
        </span>
      </div>
      {/* <button
        onClick={() => removeToast(toast.id)}
        className={`${config.text} hover:opacity-70 transition-opacity`}
      >
        <IoMdClose size={20} />
      </button> */}
    </div>
  );
};

export default ToastItem;
