import * as Yup from "yup";

const today = new Date();
today.setHours(0, 0, 0, 0); // Normalize time to 00:00:00


export const invoiceValidation = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  payer_name: Yup.string().required("Client name is required"),
  payer_email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
  country: Yup.string().required("Country is required"),
  due_date: Yup.date()
    .required("Due date is required")
    .min(today, "Due date can't be in the past"),
  invoice_items: Yup.array()
    .of(
      Yup.object().shape({
        invoice_type: Yup.string().required("Invoice type is required"),
        description: Yup.string().required("Description is required"),
        quantity: Yup.number()
          .required("Quantity is required")
          .min(1, "Minimum quantity is 1"),
        unit_price: Yup.number()
          .required("Unit price is required")
          .min(0, "Must be positive"),
        discount: Yup.number()
          .min(0, "Discount must be 0 or more")
          .max(100, "Discount cannot exceed 100"),
        amount: Yup.number().required("Amount is required"),
      })
    )
    .min(1, "At least one item is required"),
});

export const addItemValidation = Yup.object().shape({
  invoice_type: Yup.string()
    .oneOf(["per_hour", "per_unit"], "Invalid invoice type")
    .required("Invoice type is required"),

  description: Yup.string()
    .min(3, "Description must be at least 3 characters")
    .required("Description is required"),

  quantity: Yup.number()
    .min(1, "Quantity must be at least 1")
    .required("Quantity is required"),

  unit_price: Yup.number()
    .min(1, "Unit price must be greater 0")
    .required("Unit price is required"),

  discount: Yup.number()
    .min(0, "Discount must be 0 or greater")
    .max(100, "Discount cannot be more than 100%")
    .nullable(),

  amount: Yup.number()
    .min(0, "Amount must be 0 or greater")
    .required("Amount is required"),
});
