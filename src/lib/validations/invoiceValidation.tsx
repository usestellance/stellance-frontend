import * as Yup from "yup";

export const invoiceValidation = Yup.object().shape({
  billTo: Yup.string().required("Bill To is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  address: Yup.string().required("Address is required"),
  dueDate: Yup.string().required("Due date is required"),
  currency: Yup.string().required("Currency is required"),
  note: Yup.string().optional(),
  items: Yup.array()
    .of(
      Yup.object().shape({
        invoiceType: Yup.string().required("Invoice type is required"),
        description: Yup.string().required("Description is required"),
        quantity: Yup.number()
          .required("Quantity is required")
          .min(1, "Minimum quantity is 1"),
        unitPrice: Yup.number()
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
  invoiceType: Yup.string()
    .oneOf(["perHour", "perUnit"], "Invalid invoice type")
    .required("Invoice type is required"),

  description: Yup.string()
    .min(3, "Description must be at least 3 characters")
    .required("Description is required"),

  quantity: Yup.number()
    .min(1, "Quantity must be at least 1")
    .required("Quantity is required"),

  unitPrice: Yup.number()
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
