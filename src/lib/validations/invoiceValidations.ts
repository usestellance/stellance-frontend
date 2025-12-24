import { z } from "zod";

// Logo validation
const logoSchema = z
  .instanceof(File)
  .refine((file) => file.size <= 5 * 1024 * 1024, {
    message: "Logo must be less than 5MB",
  })
  .refine(
    (file) =>
      [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
        "image/svg+xml",
      ].includes(file.type),
    {
      message: "Logo must be .jpg, .png, .webp, or .svg format",
    }
  )
  .optional()
  .or(z.literal(undefined));

// Invoice schema - expandable
export const invoiceSchema = z.object({
  // Logo
  logo: logoSchema,

  // Invoice details (add more fields as needed)
  invoiceNumber: z.string().min(1, "Invoice number is required"),
//   invoiceDate: z.date({
//     required_error: "Invoice date is required",
//   }),
//   dueDate: z.date({
//     required_error: "Due date is required",
//   }),

  // Client/Customer details
  clientName: z.string().min(1, "Client name is required"),
  email: z.string().email("Invalid email address").optional(),
  address: z.string().optional(),

  // Invoice items (expandable)
  items: z
    .array(
      z.object({
        description: z.string().min(1, "Description is required"),
        quantity: z.number().min(1, "Quantity must be at least 1"),
        unitPrice: z.number().min(0, "Price must be positive"),
        amount: z.number(),
      })
    )
    .min(1, "At least one item is required"),

  // Totals
  subtotal: z.number(),
  tax: z.number().optional(),
  discount: z.number().optional(),
  total: z.number(),

  // Additional fields
  notes: z.string().optional(),
  dueDate: z.string().optional(),

  // Add more fields here as you expand...
});

export type InvoiceFormValues = z.infer<typeof invoiceSchema>;
