"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

// Shadcn dialog
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

// Shadcn drawer
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import InputField from "@/components/ui/custom/InputField";
import { useMediaQuery } from "../../../hooks/use-media-query";

const ChangePasswordSchema = z
  .object({
    old_password: z.string().min(6, "Invalid password"),
    new_password: z.string().min(6, "Password must be at least 6 characters"),
    confirm_password: z.string().min(6),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

type ChangePasswordValues = z.infer<typeof ChangePasswordSchema>;

export default function ChangePasswordModal() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [open, setOpen] = useState(false);

  const form = useForm<ChangePasswordValues>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      old_password: "",
      new_password: "",
      confirm_password: "",
    },
  });

  const onSubmit = (data: ChangePasswordValues) => {
    console.log("Password Updated:", data);
    setOpen(false);
  };

  const TriggerElement = (
    <div className="text-error-500 lg:text-xl cursor-pointer">
      Change Password
    </div>
  );

  // ----------------------------
  // DESKTOP → DIALOG
  // ----------------------------
  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{TriggerElement}</DialogTrigger>
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Enter a new password for your account, use at least 8 characters
              with a mix of letters, numbers and symbols.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* OLD PASSWORD */}
              <FormField
                control={form.control}
                name="old_password"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Old Password</FormLabel>
                    <FormControl>
                      <InputField
                        {...field}
                        type="password"
                        placeholder="Enter old password"
                        error={fieldState.error?.message ?? null}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* NEW PASSWORD */}
              <FormField
                control={form.control}
                name="new_password"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <InputField
                        {...field}
                        type="password"
                        placeholder="Enter new password"
                        error={fieldState.error?.message ?? null}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* CONFIRM PASSWORD */}
              <FormField
                control={form.control}
                name="confirm_password"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <InputField
                        {...field}
                        type="password"
                        placeholder="Confirm password"
                        error={fieldState.error?.message ?? null}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="submit" className="w-full max-w-60 mx-auto mt-5">
                  Update
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    );
  }

  // ----------------------------
  // MOBILE → DRAWER
  // ----------------------------
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{TriggerElement}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Change Password</DrawerTitle>
          <DrawerDescription>
            Enter a new password for your account, use at least 8 characters
            with a mix of letters, numbers and symbols.
          </DrawerDescription>
        </DrawerHeader>

        <div className="p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* OLD PASSWORD */}
              <FormField
                control={form.control}
                name="old_password"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Old Password</FormLabel>
                    <FormControl>
                      <InputField
                        {...field}
                        type="password"
                        placeholder="Enter old password"
                        error={fieldState.error?.message ?? null}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* NEW PASSWORD */}
              <FormField
                control={form.control}
                name="new_password"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <InputField
                        {...field}
                        type="password"
                        placeholder="Enter new password"
                        error={fieldState.error?.message ?? null}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* CONFIRM PASSWORD */}
              <FormField
                control={form.control}
                name="confirm_password"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <InputField
                        {...field}
                        type="password"
                        placeholder="Confirm password"
                        error={fieldState.error?.message ?? null}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DrawerFooter className="flex flex-col gap-3">
                <Button type="submit" className="max-w-[120px] mx-auto">
                  Update
                </Button>
                {/* <DrawerClose asChild>
                  <Button variant="outline" className="w-full">
                    Cancel
                  </Button>
                </DrawerClose> */}
              </DrawerFooter>
            </form>
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
