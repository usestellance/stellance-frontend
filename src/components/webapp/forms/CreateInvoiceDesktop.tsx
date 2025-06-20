"use client";

import { FormikErrors, useFormik } from "formik";
import React from "react";
import { toast } from "sonner";
import { invoiceValidation } from "../../../lib/validations/invoiceValidation";
import InputField from "../ui/InputField";
import TextAreaField from "../ui/TextAreaField";
import AppButton from "../ui/AppButton";
import {
  calculateFinalTotal,
  calculateServiceFee,
  calculateSubtotal,
  formatCurrency,
} from "../../../utils/helpers/helperFunctions";
import { SERVICE_CHARGE } from "../../../utils/Constants";
import SelectField from "../ui/SelectField";
import { FiTrash } from "react-icons/fi";
import { InvoiceItemsTypes, InvoiceType } from "../../../lib/types/invoiceType";

export default function CreateInvoiceDesktop({ inv }: { inv: string }) {
  console.log(inv);

  const formik = useFormik<InvoiceType>({
    initialValues: {
      title: "",
      billTo: "",
      email: "",
      address: "",
      dueDate: "",
      serviceFee: "",
      note: "",
      items: [],
    },
    validationSchema: invoiceValidation,
    onSubmit: (values) => {
      console.log(values);
      toast.success("Invoice Created");
      // setEditingIndex(null);
    },
  });

  const handleItemChange = (
    index: number,
    field: keyof InvoiceItemsTypes,
    value: string | number
  ) => {
    const updatedItems = [...formik.values.items];
    (updatedItems[index][field] as typeof value) =
      field === "quantity" ||
      field === "unitPrice" ||
      field === "discount" ||
      field === "amount"
        ? Number(value)
        : (value as string);

    // Auto-calculate amount
    updatedItems[index].amount =
      updatedItems[index].quantity *
      updatedItems[index].unitPrice *
      ((100 - updatedItems[index].discount) / 100);

    formik.setFieldValue("items", updatedItems);
  };

  const removeItem = (index: number) => {
    const updatedItems = [...formik.values.items];
    updatedItems.splice(index, 1);
    formik.setFieldValue("items", updatedItems);
  };

  const subtotalValue = calculateSubtotal(formik.values.items);
  const subtotal = formatCurrency(subtotalValue);
  const serviceCharge = formatCurrency(calculateServiceFee(subtotalValue));
  const total = formatCurrency(
    calculateFinalTotal(subtotalValue, calculateServiceFee(subtotalValue))
  );

  const clearItems = () => {
    formik.setFieldValue("items", []);
  };

  return (
    <div className="md:mt-[60px] lg:pb-20 ">
      <h1 className="text-2xl font-bold mb-4 myContainer max-md:hidden">
        Create Invoice
      </h1>
      <form onSubmit={formik.handleSubmit} className="mt-8">
        <div className="myContainer flex flex-col gap-4 md:gap-[30px] max-w-[700px] w-full">
          <InputField
            name="Title"
            label="Invoice Title"
            placeholder="short title..."
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.title ? formik.errors.title || null : null}
          />
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

        <div className="mt-6 md:mt-20 myContainer">
          <h2 className="section-subtitle mt-10 mb-5">Invoice Items</h2>

          {/* Inline Editing (Optional) */}
          <div className="flex flex-col gap-10 divide-y divide-primary">
            {formik.values.items.map((item, index) => (
              <div key={index} className="pb-16">
                <div className="flex gap-[18px] flex-col">
                  <div className="flex gap-[10px] lg:gap-[18px]">
                    <div className="flex-1/5">
                      <SelectField
                        name={`items[${index}].invoiceType`}
                        label="Invoice Type"
                        options={[
                          { label: "Per Hour", value: "perHour" },
                          { label: "Per Unit", value: "perUnit" },
                        ]}
                        value={item.invoiceType}
                        onChange={(value) =>
                          handleItemChange(index, "invoiceType", value)
                        }
                        onBlur={() =>
                          formik.setFieldTouched(
                            `items[${index}].invoiceType`,
                            true
                          )
                        }
                        error={
                          formik.touched.items?.[index]?.invoiceType
                            ? Array.isArray(formik.errors.items) &&
                              formik.errors.items[index]
                              ? (
                                  formik.errors.items[
                                    index
                                  ] as FormikErrors<InvoiceItemsTypes>
                                ).invoiceType || null
                              : null
                            : null
                        }
                      />
                    </div>
                    <div className="flex-2/3">
                      <InputField
                        name={`items[${index}].description`}
                        label="Description"
                        value={item.description}
                        onChange={(e) =>
                          handleItemChange(index, "description", e.target.value)
                        }
                        error={
                          formik.touched.items?.[index]?.description
                            ? Array.isArray(formik.errors.items) &&
                              formik.errors.items[index]
                              ? (
                                  formik.errors.items[
                                    index
                                  ] as FormikErrors<InvoiceItemsTypes>
                                ).description || null
                              : null
                            : null
                        }
                      />
                    </div>
                  </div>
                  <div className="flex items-end gap-3 w-full lg:gap-[18px]">
                    <div className="w-full">
                      <InputField
                        name={`items[${index}].quantity`}
                        label="Quantity"
                        type="number"
                        value={item.quantity}
                        min={0}
                        onChange={(e) =>
                          handleItemChange(index, "quantity", e.target.value)
                        }
                        error={
                          formik.touched.items?.[index]?.quantity
                            ? Array.isArray(formik.errors.items) &&
                              formik.errors.items[index]
                              ? (
                                  formik.errors.items[
                                    index
                                  ] as FormikErrors<InvoiceItemsTypes>
                                ).quantity || null
                              : null
                            : null
                        }
                      />
                    </div>
                    <div className="w-full">
                      <InputField
                        name={`items[${index}].unitPrice`}
                        label="Unit Price"
                        type="number"
                        value={item.unitPrice}
                        min={0}
                        onChange={(e) =>
                          handleItemChange(index, "unitPrice", e.target.value)
                        }
                        error={
                          formik.touched.items?.[index]?.unitPrice
                            ? Array.isArray(formik.errors.items) &&
                              formik.errors.items[index]
                              ? (
                                  formik.errors.items[
                                    index
                                  ] as FormikErrors<InvoiceItemsTypes>
                                ).unitPrice || null
                              : null
                            : null
                        }
                      />
                    </div>
                    <div className="w-full">
                      <InputField
                        name={`items[${index}].discount`}
                        label="Discount (%)"
                        type="number"
                        value={item.discount}
                        min={0}
                        onChange={(e) =>
                          handleItemChange(index, "discount", e.target.value)
                        }
                        error={
                          formik.touched.items?.[index]?.discount
                            ? Array.isArray(formik.errors.items) &&
                              formik.errors.items[index]
                              ? (
                                  formik.errors.items[
                                    index
                                  ] as FormikErrors<InvoiceItemsTypes>
                                ).discount || null
                              : null
                            : null
                        }
                      />
                    </div>
                    <div className="w-full">
                      <InputField
                        name={`items[${index}].amount`}
                        label="Amount"
                        type="number"
                        value={item.amount}
                        readonly
                        min={0}
                        error={
                          formik.touched.items?.[index]?.amount
                            ? Array.isArray(formik.errors.items) &&
                              formik.errors.items[index]
                              ? (
                                  formik.errors.items[
                                    index
                                  ] as FormikErrors<InvoiceItemsTypes>
                                ).amount || null
                              : null
                            : null
                        }
                      />
                    </div>
                    {formik.values.items.length > 1 && (
                      <div
                        className="h-[26px] mb-4 w-[26px] flex justify-center items-center cursor-pointer"
                        onClick={() => removeItem(index)}
                      >
                        <FiTrash size={26} className="text-[#EB4335]" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => {
              const newItem: InvoiceItemsTypes = {
                invoiceType: "perHour",
                description: "",
                quantity: 1,
                unitPrice: 0,
                discount: 0,
                amount: 0,
              };
              formik.setFieldValue("items", [...formik.values.items, newItem]);
            }}
            className={`${
              formik.values.items.length > 0 ? "mt-5" : ""
            } bg-primary-light text-text-strong text-xs px-[23px] py-[10px] rounded-[35px] font-medium md:text-base md:px-7 md:py-3 xlpy-[17px] xlpx-[43px] xl:mt-5 xl:text-lg`}
          >
            Add New Item
          </button>
        </div>

        <hr className="border-[#BFBFBF99] mt-10" />

        <section className="flex flex-col items-end bg-geen-400">
          <div className="myContainer border-b border-[#bfbfbf99] pt-[35px] pb-[18px] lg:pb-[33px] flex justify-between items-center min-w-[600px] max-w-3xl gap-4">
            <h5 className="text-sm font-bold leading-[25px] md:text-lg whitespace-nowrap">
              Sub Total
            </h5>
            <h5 className="text-sm font-bold leading-[25px] md:text-lg truncate">
              {subtotal}
            </h5>
          </div>

          {/* <hr className="border-[#BFBFBF99] " /> */}

          <div className="myContainer gap-4 pt-[18px] pb-9 flex justify-between items-center max-w-3xl min-w-[600px]">
            <div className="flex gap-1">
              <h5 className="text-sm md:text-lg font-bold leading-[25px] whitespace-nowrap">
                Service charge (%)
              </h5>
              <div className="border border-[#AAAAAA] font-medium text-xs h-[30px] w-[58px] flex items-center justify-center px-[10px] py-[6px] rounded-[6px] md:text-base text-center">
                {SERVICE_CHARGE}
              </div>
            </div>
            <h5 className="text-sm font-bold leading-[25px] md:text-lg truncate">
              {serviceCharge}
            </h5>
          </div>

          <div className="myContainer  min-w-[400px] max-w-3xl">
            <div className=" flex justify-between h-[43px] md:h-[48h] border border-primary overflow-hidden dark:border-white items-center gap-[10px] rounded-[6px] ">
              <h5 className="text-sm font-bold leading-[25px] py-3 px-4 w-[74px] text-white bg-primary dark:text-text-strong dark:bg-white md:text-lg">
                Total
              </h5>
              <h5 className="truncate text-sm font-bold leading-[25px] md:text-lg py-3 px-4">
                {total}
              </h5>
            </div>
          </div>
        </section>

        <section className="myContainer">
          <div className="mt-10 flex flex-col gap-4 md:gap-[30px]">
            <div className="max-w-[300px] w-full">
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
            </div>
            <TextAreaField
              name="note"
              label="Add Note"
              placeholder="Add additional note like thank you note, return policy or others"
              value={formik.values.note}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.note ? formik.errors.note || null : null}
            />
          </div>

          <div className="flex justify-center gap-[25px] mt-[50px] lg:mt-20 lg:gap-[54px]">
            <AppButton
              onClick={clearItems}
              size="sm"
              theme="tetiary"
              className="w-full max-w-[450px]"
            >
              Cancel
            </AppButton>
            <AppButton type="submit" size="sm" className="w-full max-w-[450px]">
              Proceed
            </AppButton>
          </div>
        </section>
      </form>
    </div>
  );
}
