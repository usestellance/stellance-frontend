import { z } from "zod";

// Same strong password regex from your Yup schema
export const isStrongPassword = (password: string) => {
  return /^(?=.*[A-Za-z])(?=.*[\d!@#$%^&*(),.?":{}|<>;'[\]~\-_=+])[A-Za-z\d!@#$%^&*(),.?":{}|<>;'[\]~\-_=+]{8,}$/.test(
    password
  );
};

export const SignUpSchema = z
  .object({
    email: z
      .string()
      .email("Invalid email address")
      .nonempty("Email is required"),

    password: z
      .string()
      .nonempty("Password is required")
      .min(8, "At least 8 characters")
      .refine(
        (value) => /[\d@$!%*?&]/.test(value), // number or symbol
        "Contain a number or symbol"
      )
      .refine((value) => isStrongPassword(value), "Password strength: Weak"),

    confirmPassword: z.string().nonempty("Please confirm your password"),
  })

  // ❌ Password must NOT contain email
  .refine((data) => !data.password.includes(data.email), {
    message: "Can't contain your email address",
    path: ["password"], // attach error to password
  })

  // ❌ Passwords must match
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
