"use client";

import { z } from "zod";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";

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
import { authRoutes} from "../../../config/constants/routes";
import { useRouter } from "next/navigation";
import { useToast } from "../../../hooks/useToast";
import { ResetPasswordSchema } from "../../../lib/validations/authValidations";
import { getPasswordStrength } from "../../../lib/utils";

type ResetPasswordValues = z.infer<typeof ResetPasswordSchema>;

export default function ResetPasswordForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();

  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      otp: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: ResetPasswordValues) => {
    setLoading(true);
    console.log("Submitted:", values);
    setTimeout(() => {
      setLoading(false);
      toast.success("Password reset successful!");
      router.push(authRoutes.LOGIN);
    }, 1000);
  };

   // Watch password value from RHF
    const passwordValue = useWatch({
      control: form.control,
      name: "password",
    });
  
    // Calculate strength using useMemo
    const strength = useMemo(() => {
      return getPasswordStrength(passwordValue ?? "");
    }, [passwordValue]);
  
   

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* --------------------------------
              PASSWORD FIELD
          -------------------------------- */}
          <FormField
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>

                <FormControl>
                  <div>
                    <InputField
                      {...field}
                      label=""
                      placeholder="Enter your password"
                      type="password"
                      error={fieldState.error?.message ?? null}
                    />

                    {/* PASSWORD STRENGTH METER */}
                    {passwordValue && passwordValue.length > 0 && (
                      <div className="mt-2">
                        <div className="w-full h-2 bg-[#cccccc] rounded-[6px] overflow-hidden">
                          <div
                            className={`h-full ${strength.color}`}
                            style={{
                              width: `${(strength.score / 4) * 100}%`,
                            }}
                          />
                        </div>
                        <p className="mt-1 text-xs font-medium">
                          {strength.label}
                        </p>
                      </div>
                    )}
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* --------------------------------
              CONFIRM PASSWORD FIELD
          -------------------------------- */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>

                <FormControl>
                  <InputField
                    {...field}
                    label=""
                    placeholder="Confirm your password"
                    type="password"
                    error={fieldState.error?.message ?? null}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* --------------------------------
              OTP FIELD
          -------------------------------- */}
          <FormField
            control={form.control}
            name="otp"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>One Time Password (OTP)</FormLabel>

                <FormControl>
                  <InputField
                    {...field}
                    label=""
                    placeholder="Confirm your password"
                    type="password"
                    error={fieldState.error?.message ?? null}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" isLoading={loading} className="w-full mt-2">
            Reset Password
          </Button>
        </form>
      </Form>
    </div>
  );
}
