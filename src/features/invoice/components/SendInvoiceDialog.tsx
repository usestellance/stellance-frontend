"use client";

import React, { useState, useRef, KeyboardEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";

type SendInvoiceDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSend: (data: { emails: string[] }) => void;
  pending?: boolean;
};

const SendInvoiceDialog = ({
  open,
  onOpenChange,
  onSend,
  pending,
}: SendInvoiceDialogProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [emails, setEmails] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  };

  const addEmail = (email: string) => {
    const trimmedEmail = email.trim();

    if (!trimmedEmail) return;

    if (!validateEmail(trimmedEmail)) {
      setError("Please enter a valid email address");
      return;
    }

    if (emails.includes(trimmedEmail)) {
      setError("This email has already been added");
      return;
    }

    setEmails([...emails, trimmedEmail]);
    setInputValue("");
    setError("");
  };

  const removeEmail = (emailToRemove: string) => {
    setEmails(emails.filter((email) => email !== emailToRemove));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "," || e.key === " ") {
      e.preventDefault();
      addEmail(inputValue);
    } else if (e.key === "Backspace" && !inputValue && emails.length > 0) {
      removeEmail(emails[emails.length - 1]);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text");
    const pastedEmails = pastedText.split(/[,;\s]+/).filter(Boolean);

    pastedEmails.forEach((email) => {
      const trimmedEmail = email.trim();
      if (validateEmail(trimmedEmail) && !emails.includes(trimmedEmail)) {
        setEmails((prev) => [...prev, trimmedEmail]);
      }
    });
    setInputValue("");
  };

  const handleSubmit = (skipMembers: boolean = false) => {
    if (inputValue.trim()) {
      addEmail(inputValue);
    }

    const emailsToSend = skipMembers ? [] : emails;
    onSend({ emails: emailsToSend });

    console.log("Submitted emails:", emailsToSend);
    // Reset form
    setEmails([]);
    setInputValue("");
    setError("");
    onOpenChange(false);
  };
  const handleCancel = () => {
    // Reset form
    setEmails([]);
    setInputValue("");
    setError("");
    onOpenChange(false);
  };

  const emailInputContent = (
    <div>
      <Label className="sm:text-lg">Email Address(es)</Label>
      <div
        className="mt-2 min-h-[42px] w-full border-b border-primary-100 px-3 py-3 text-sm cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        <div className="flex flex-wrap gap-2 items-center mt-1">
          {emails.map((email) => (
            <span
              key={email}
              className="inline-flex items-center gap-1 bg-primary-50 rounded-[5px] px-2 py-1 text-sm font-medium lg:text-base"
            >
              {email}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeEmail(email);
                }}
                className="hover:bg-secondary-foreground/20 rounded-sm p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            onBlur={() => {
              if (inputValue.trim()) {
                addEmail(inputValue);
              }
            }}
            placeholder={
              emails.length === 0
                ? "e.g. client@email.com, finance@email.com"
                : ""
            }
            className="flex-1 min-w-fit outline-none bg-transparent"
          />
        </div>
      </div>
      {error && <p className="text-sm text-destructive mt-1">{error}</p>}
      <p className="text-xs text-muted-foreground mt-1">
        Press Enter, comma, or space to add email
      </p>
    </div>
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add members to this invoice</DialogTitle>
            <DialogDescription className="sm:max-w-4/5">
              Members added to this invoice will be able to follow up and add
              comments.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {emailInputContent}

            <DialogFooter>
              <Button
                type="submit"
                // onClick={() => handleSubmit(true)}
                onClick={handleCancel}
                variant="outline"
                className="w-full max-w-60 mx-auto mt-5"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={() => handleSubmit(false)}
                disabled={emails.length === 0}
                className="w-full max-w-60 mx-auto mt-5"
              >
                Add and Send
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="pb-20">
        <DrawerHeader className="text-left">
          <DrawerTitle>Add members to this invoice</DrawerTitle>
          <DrawerDescription>
            Members added to this invoice will be able to follow up and add
            comments.
          </DrawerDescription>
        </DrawerHeader>

        {/* <div className="bg-red300"> */}
          <div className="p-4 space-y-4 overflow-y-auto">
            {emailInputContent}
          </div>

          <DrawerFooter className="">
            <div className="flex justify-center gap-6">
              <Button
                type="button"
                //   onClick={() => handleSubmit(true)}
                onClick={handleCancel}
                variant="outline"
                className="in-app-btn"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={() => handleSubmit(false)}
                disabled={emails.length === 0}
                className="in-app-btn"
                isLoading={pending}
              >
                Add and Send
              </Button>
            </div>
          </DrawerFooter>
        {/* </div> */}
      </DrawerContent>
    </Drawer>
  );
};

export default SendInvoiceDialog;
// "use client";

// import React from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "../../../components/ui/dialog";
// import { Button } from "../../../components/ui/button";
// import { Form } from "../../../components/ui/form";
// import { Input } from "../../../components/ui/input";
// import { useForm } from "react-hook-form";
// import { Label } from "../../../components/ui/label";
// import InputField from "../../../components/ui/custom/InputField";

// type SendInvoiceDialogProps = {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   onSend: (data: { emails: string[] }) => void;
// };

// const SendInvoiceDialog = ({
//   open,
//   onOpenChange,
//   onSend,
// }: SendInvoiceDialogProps) => {
//   const form = useForm({
//     defaultValues: {
//       emails: [],
//     },
//   });

//   const onSubmit = (data: { emails: string[] }) => {
//     onSend(data);
//     onOpenChange(false);
//   };

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Add members to this invoice</DialogTitle>
//           <DialogDescription className="max-w-2/3">
//             Members added to this invoice will be able to follow up and add
//             comments.
//           </DialogDescription>
//         </DialogHeader>

//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//             <Label>Email Address(es)</Label>
//             <InputField
//               placeholder="e.g. client@email.com, finance@email.com"
//               {...form.register("emails", { required: true })}
//             />

//             <DialogFooter>
//               <Button
//                 type="submit"
//                 variant="outline"
//                 className="w-full max-w-60 mx-auto mt-5"
//               >
//                 Skip and Send
//               </Button>
//               <Button type="submit" className="w-full max-w-60 mx-auto mt-5">
//                 Add and Send
//               </Button>
//             </DialogFooter>
//           </form>
//         </Form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default SendInvoiceDialog;
