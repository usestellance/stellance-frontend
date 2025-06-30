"use client";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
// import { useState } from "react";
import { useChangePasswordModalStore } from "../../../store/modals";
import ChangePasswordForm from "../forms/ChangePasswordForm";

export default function ChangePasswordModal() {
  const { closeModal, isModalOpen } = useChangePasswordModalStore();
  const handleCloseModal = () => {
    closeModal();
  };

  console.log(isModalOpen);

  return (
    <>
      <Dialog
        open={isModalOpen}
        as="div"
        className="bg-[#1D1D1D57]  relative z-[10001] focus:outline-none"
        onClose={handleCloseModal}
        __demoMode
      >
        <div className="fixed top-0 left-0 right-0 bottom-0 inset0 w-screen overflow-y-auto bg-[#1D1D1D57] ">
          <div className="flex min-h-full items-end justify-center md:items-center">
            <DialogPanel
              transition
              className="w-full rounded-tr-[10px] rounded-tl-[10px] bg-white dark:bg-primary text-text-strong dark:text-white myContainer pt-[18px] pb-11 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 md:rounded-[10px] md:max-w-2xl md:pt-10 md:pb-10"
            >
              <DialogTitle
                as="h3"
                className="text-xl md:text-2xl mb-7 font-bold text-text-strong dark:text-white"
              >
                Change Password
              </DialogTitle>
              <ChangePasswordForm />
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
