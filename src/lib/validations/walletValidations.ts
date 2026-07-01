import { z } from "zod";

export const createPinSchema = z.object({
    pin: z
      .string()
      .min(4, "PIN must be at least 4 digits")
      .max(8, "PIN cannot exceed 8 digits")
      .regex(/^\d+$/, "PIN must contain only numbers"),

    confirm_pin: z.string(),
  })
  .refine((data) => data.pin === data.confirm_pin, {
    message: "PINs do not match",
    path: ["confirm_pin"],
  });

export type CreatePinFormData = z.infer<typeof createPinSchema>;