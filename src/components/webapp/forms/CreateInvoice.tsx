/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { toast } from "sonner";
import { invoiceValidation } from "../../../lib/validations/invoiceValidation";
import InputField from "../ui/InputField";
import TextAreaField from "../ui/TextAreaField";
import AppButton from "../ui/AppButton";
import InvoiceItemsCard from "../InvoiceItemsCard";
import { useAddItemModal } from "../../../store/modals";
import { useInvoiceItems } from "../../../store/invoiceItemsStore";

interface Items {
  invoiceType: string;
  description: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  amount: number;
}

interface IInvoice {
  billTo: string;
  email: string;
  address: string;
  items: Items[];
  dueDate: string;
  currency: string;
  note: string;
  serviceFee: string;
}

export default function CreateInvoice({ inv }: { inv: string }) {
  const { openModal } = useAddItemModal();
  const { items, removeItem, clearItems, setEditingIndex } = useInvoiceItems();

  console.log(inv);

  const formik = useFormik<IInvoice>({
    // {
    //   invoiceType: "",
    //   description: "",
    //   quantity: 1,
    //   unitPrice: 0,
    //   discount: 0,
    //   amount: 0,
    // },
    initialValues: {
      billTo: "",
      email: "",
      address: "",
      dueDate: "",
      currency: "",
      serviceFee: "",
      note: "",
      items: items,
    },
    validationSchema: invoiceValidation,
    onSubmit: (values) => {
      console.log(values);
      toast.success("Invoice Created");
      clearItems();
      setEditingIndex(null);
    },
  });

  //   const handleItemChange = (
  //     index: number,
  //     field: keyof Items,
  //     value: string | number
  //   ) => {
  //     const updatedItems = [...formik.values.items] as Items[];
  //     (updatedItems[index][field] as typeof value) =
  //       field === "quantity" ||
  //       field === "unitPrice" ||
  //       field === "discount" ||
  //       field === "amount"
  //         ? Number(value)
  //         : (value as string);

  //     // Automatically calculate amount
  //     updatedItems[index].amount =
  //       updatedItems[index].quantity *
  //       updatedItems[index].unitPrice *
  //       ((100 - updatedItems[index].discount) / 100);

  //     formik.setFieldValue("items", updatedItems);
  //   };

  //   const addItem = () => {
  //     openModal();
  //     // const newItem: Items = {
  //     //   invoiceType: "",
  //     //   description: "",
  //     //   quantity: 1,
  //     //   unitPrice: 0,
  //     //   discount: 0,
  //     //   amount: 0,
  //     // };
  //     // formik.setFieldValue("items", [...formik.values.items, newItem]);
  //   };

  //   const removeItem = (index: number) => {
  //     const updatedItems = [...formik.values.items];
  //     updatedItems.splice(index, 1);
  //     formik.setFieldValue("items", updatedItems);
  //   };

  useEffect(() => {
    formik.setFieldValue("items", items);
  }, [items]);

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-4 myContainer">Create Invoice</h1>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
        <div className="myContainer">
          <InputField
            name="billTo"
            label="Bill To"
            placeholder="Client Name"
            value={formik.values.billTo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.billTo ? formik.errors.billTo || null : null}
          />

          <InputField
            name="email"
            label="Email"
            placeholder="Client Email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email ? formik.errors.email || null : null}
          />

          <InputField
            name="address"
            label="Address/Country"
            placeholder="Enter Address"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.address ? formik.errors.address || null : null
            }
          />
        </div>

        <div className="mt-6 myContainer">
          <h2 className="section-subtitle mb-5">Invoice Items</h2>
          <div className="flex flex-col gap-[26px]">
            {formik.values.items.map((item, index) => (
              <InvoiceItemsCard
                key={index}
                invoiceType={item.invoiceType}
                amount={item.amount}
                description={item.description}
                discount={item.discount}
                quantity={item.quantity}
                unitPrice={item.unitPrice}
                removeItem={() => removeItem(index)}
                editItem={() => {
                  setEditingIndex(index);
                  openModal();
                }}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={openModal}
            className="bg-primary-light text-text-strong text-xs px-[23px] py-[10px] rounded-[35px] font-medium mt-5"
          >
            Add New Item
          </button>
        </div>
        <hr className="border-[#BFBFBF99] mt-5" />

        {/* {formik.values.items.map((item, index) => (
          <div key={index} className="border p-4 rounded-md mb-4 space-y-4">
            <InputField
              name={`items[${index}].invoiceType`}
              label="Invoice Type"
              value={item.invoiceType}
              onChange={(e) =>
                handleItemChange(index, "invoiceType", e.target.value)
              }
            />
            <InputField
              name={`items[${index}].description`}
              label="Description"
              value={item.description}
              onChange={(e) =>
                handleItemChange(index, "description", e.target.value)
              }
            />
            <InputField
              name={`items[${index}].quantity`}
              label="Quantity"
              type="number"
              value={item.quantity}
              onChange={(e) =>
                handleItemChange(index, "quantity", e.target.value)
              }
            />
            <InputField
              name={`items[${index}].unitPrice`}
              label="Unit Price"
              type="number"
              value={item.unitPrice}
              onChange={(e) =>
                handleItemChange(index, "unitPrice", e.target.value)
              }
            />
            <InputField
              name={`items[${index}].discount`}
              label="Discount (%)"
              type="number"
              value={item.discount}
              onChange={(e) =>
                handleItemChange(index, "discount", e.target.value)
              }
            />
            <InputField
              name={`items[${index}].amount`}
              label="Amount"
              type="number"
              value={item.amount}
              disabled
            />

            {formik.values.items.length > 1 && (
              <button
                type="button"
                className="text-red-500 text-sm"
                onClick={() => removeItem(index)}
              >
                Remove Item
              </button>
            )}
          </div>
        ))} */}

        <div className="myContainer">
          <InputField
            name="dueDate"
            label="Due Date"
            type="date"
            value={formik.values.dueDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.dueDate ? formik.errors.dueDate || null : null
            }
          />

          <InputField
            name="currency"
            label="Currency"
            placeholder="e.g. USD"
            value={formik.values.currency}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.currency ? formik.errors.currency || null : null
            }
          />

          <TextAreaField
            name="note"
            label="Note"
            placeholder="Add additional note like thank you note, return policy or others"
            value={formik.values.note}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.note ? formik.errors.note || null : null}
          />

          <div className="flex justify-center gap-[25px] mt-[20px]">
            <AppButton onClick={clearItems} size="sm" theme="tetiary">
              Cancel
            </AppButton>
            <AppButton type="submit" size="sm">
              Proceed
            </AppButton>
          </div>
        </div>
      </form>
    </div>
  );
}
