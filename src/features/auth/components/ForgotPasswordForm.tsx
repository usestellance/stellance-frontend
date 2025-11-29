"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import InputField from "@/components/ui/custom/InputField";
// import { useRouter } from "next/navigation";
import { useToast } from "../../../hooks/useToast";

import { ForgotPasswordSchema } from "../../../lib/validations/authValidations";

type ForgotPasswordValues = z.infer<typeof ForgotPasswordSchema>;

export default function ForgotPasswordForm() {
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
//   const router = useRouter();
  const toast = useToast();

  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  // Countdown timer effect
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [cooldown]);

  const onSubmit = (values: ForgotPasswordValues) => {
    setLoading(true);
    console.log("Submitted:", values);
    setTimeout(() => {
      setLoading(false);
      setCooldown(60); // Start 60-second cooldown
      toast.success("Reset link sent to your email!");
    }, 1000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const isDisabled = loading || cooldown > 0;

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* --------------------------------
              EMAIL FIELD
          -------------------------------- */}
          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>

                <FormControl>
                  <InputField
                    {...field}
                    label=""
                    placeholder="Email address"
                    type="email"
                    error={fieldState.error?.message ?? null}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            isLoading={loading}
            disabled={isDisabled}
            className="w-full md:mt-2"
          >
            {cooldown > 0
              ? `Resend in ${formatTime(cooldown)}`
              : "Reset Password"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
