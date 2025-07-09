"use client";

import { FormikErrors, useFormik } from "formik";
import React from "react";
import { invoiceValidation } from "../../../lib/validations/invoiceValidation";
import InputField from "../ui/InputField";
// import TextAreaField from "../ui/TextAreaField";
import AppButton from "../ui/AppButton";
import {
  calculateNetTotal,
  calculateServiceFee,
  calculateTotal,
  formatCurrency,
} from "../../../utils/helpers/helperFunctions";
import { SERVICE_CHARGE } from "../../../utils/Constants";
import SelectField from "../ui/SelectField";
import { FiTrash } from "react-icons/fi";
import { InvoiceItemsTypes, InvoiceType } from "../../../lib/types/invoiceType";
import ComboboxField from "../ui/ComboboxField";
import { countryCodes } from "../../../utils/contents/countryCodes";
import { useCreateInvoice } from "../../../hooks/useInvoice";
import { userAuth } from "../../../store/userAuth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { accountSetUpRoute, walletRoute } from "../../../utils/route";

export default function CreateInvoiceDesktop() {
  const { mutate, isPending } = useCreateInvoice();
  const { credentials } = userAuth();
  const router = useRouter();

  const is_profile_complete = credentials?.profile_complete;

  const formik = useFormik<InvoiceType>({
    initialValues: {
      title: "",
      payer_name: "",
      payer_email: "",
      country: "",
      invoice_items: [],
      due_date: "",
      service_fee: SERVICE_CHARGE,
    },
    validationSchema: invoiceValidation,
    onSubmit: (values) => {
      if (!is_profile_complete) {
        toast.warning("Complete profile to enable creating invoice");
        router.push(accountSetUpRoute);
      } else if (is_profile_complete && !credentials?.user?.wallet?.id) {
        toast.warning("Generate wallet to enable creating invoice");
        router.push(walletRoute);
      } else {
        mutate(values);
      }
    },
  });

  const handleItemChange = (
    index: number,
    field: keyof InvoiceItemsTypes,
    value: string | number
  ) => {
    const updatedItems = [...(formik.values.invoice_items || [])];
    (updatedItems[index][field] as typeof value) =
      field === "quantity" ||
      field === "unit_price" ||
      field === "discount" ||
      field === "amount"
        ? Number(value)
        : (value as string);

    // Auto-calculate amount
    updatedItems[index].amount =
      updatedItems[index].quantity *
      updatedItems[index].unit_price *
      ((100 - updatedItems[index].discount) / 100);

    formik.setFieldValue("items", updatedItems);
  };

  const removeItem = (index: number) => {
    const updatedItems = [...(formik.values.invoice_items || [])];
    updatedItems.splice(index, 1);
    formik.setFieldValue("invoice_items", updatedItems);
  };

  const total = calculateTotal(formik.values.invoice_items || []);
  // const subtotal = formatCurrency(subtotalValue);
  const serviceCharge = formatCurrency(calculateServiceFee(total));
  const netTotal = formatCurrency(
    calculateNetTotal(total, calculateServiceFee(total))
  );

  const clearItems = () => {
    formik.setFieldValue("invoice_items", []);
  };

  const countryOptions = countryCodes.map((c) => ({
    label: c.country,
    value: c.country.toLowerCase(),
  }));

  return (
    <div className="md:mt-[60px] lg:pb-20 ">
      <h1 className="text-2xl font-bold mb-4 myContainer max-md:hidden">
        Create Invoice
      </h1>
      <form onSubmit={formik.handleSubmit} className="mt-8">
        <div className="myContainer flex flex-col gap-4 md:gap-[30px] max-w-[700px] w-full">
          <InputField
            name="title"
            label="Invoice Title"
            placeholder="short title..."
            value={formik.values.title || ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.title ? formik.errors.title || null : null}
          />
          <InputField
            name="payer_name"
            label="Bill To"
            placeholder="Client Name"
            value={formik.values.payer_name || ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.payer_name
                ? formik.errors.payer_name || null
                : null
            }
          />

          <InputField
            name="payer_email"
            label="Email"
            placeholder="Client Email"
            type="email"
            value={formik.values.payer_email || ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.payer_email
                ? formik.errors.payer_email || null
                : null
            }
          />
          <ComboboxField
            className="input-class"
            name="country"
            label="Country (Residence)"
            value={
              countryOptions.find(
                (option) => option.value === formik.values.country
              ) || null
            }
            onChange={(option) => formik.setFieldValue("country", option.value)}
            // onBlur={() => formik.setFieldTouched("country", true)}
            options={countryOptions}
            error={
              formik.touched.country ? formik.errors.country || null : null
            }
          />
        </div>

        <div className="mt-6 md:mt-20 myContainer">
          <h2 className="section-subtitle mt-10 mb-5">Invoice Items</h2>

          {/* Inline Editing (Optional) */}
          <div className="flex flex-col gap-10 divide-y divide-primary">
            {formik.values.invoice_items?.map((item, index) => (
              <div key={index} className="pb-16">
                <div className="flex gap-[18px] flex-col">
                  <div className="flex gap-[10px] lg:gap-[18px]">
                    <div className="flex-2/12">
                      <SelectField
                        name={`invoice_items[${index}].invoice_type`}
                        label="Invoice Type"
                        options={[
                          { label: "Per Hour", value: "per_hour" },
                          { label: "Per Unit", value: "per_unit" },
                        ]}
                        value={item.invoice_type}
                        onChange={(value) =>
                          handleItemChange(index, "invoice_type", value)
                        }
                        onBlur={() =>
                          formik.setFieldTouched(
                            `invoice_items[${index}].invoice_type`,
                            true
                          )
                        }
                        error={
                          Array.isArray(formik.touched.invoice_items) &&
                          formik.touched.invoice_items[index]?.invoice_type
                            ? Array.isArray(formik.errors.invoice_items) &&
                              formik.errors.invoice_items[index]
                              ? (
                                  formik.errors.invoice_items[
                                    index
                                  ] as FormikErrors<InvoiceItemsTypes>
                                ).invoice_type || null
                              : null
                            : null
                        }
                      />
                    </div>
                    <div className="flex-2/3">
                      <InputField
                        name={`invoice_items[${index}].description`}
                        label="Description"
                        value={item.description}
                        onChange={(e) =>
                          handleItemChange(index, "description", e.target.value)
                        }
                        error={
                          Array.isArray(formik.touched.invoice_items) &&
                          formik.touched.invoice_items[index]?.description
                            ? Array.isArray(formik.errors.invoice_items) &&
                              formik.errors.invoice_items[index]
                              ? (
                                  formik.errors.invoice_items[
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
                        name={`invoice_items[${index}].quantity`}
                        label="Quantity"
                        type="number"
                        value={item.quantity}
                        min={0}
                        onChange={(e) =>
                          handleItemChange(index, "quantity", e.target.value)
                        }
                        error={
                          Array.isArray(formik.touched.invoice_items) &&
                          formik.touched.invoice_items[index]?.quantity
                            ? Array.isArray(formik.errors.invoice_items) &&
                              formik.errors.invoice_items[index]
                              ? (
                                  formik.errors.invoice_items[
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
                        name={`invoice_items[${index}].unit_price`}
                        label="Unit Price"
                        type="number"
                        value={item.unit_price}
                        min={0}
                        onChange={(e) =>
                          handleItemChange(index, "unit_price", e.target.value)
                        }
                        error={
                          Array.isArray(formik.touched.invoice_items) &&
                          formik.touched.invoice_items[index]?.unit_price
                            ? Array.isArray(formik.errors.invoice_items) &&
                              formik.errors.invoice_items[index]
                              ? (
                                  formik.errors.invoice_items[
                                    index
                                  ] as FormikErrors<InvoiceItemsTypes>
                                ).unit_price || null
                              : null
                            : null
                        }
                      />
                    </div>
                    <div className="w-full">
                      <InputField
                        name={`invoice_items[${index}].discount`}
                        label="Discount (%)"
                        type="number"
                        value={item.discount}
                        min={0}
                        onChange={(e) =>
                          handleItemChange(index, "discount", e.target.value)
                        }
                        error={
                          Array.isArray(formik.touched.invoice_items) &&
                          formik.touched.invoice_items[index]?.discount
                            ? Array.isArray(formik.errors.invoice_items) &&
                              formik.errors.invoice_items[index]
                              ? (
                                  formik.errors.invoice_items[
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
                        name={`invoice_items[${index}].amount`}
                        label="Amount"
                        type="number"
                        value={item.amount}
                        readonly
                        min={0}
                        error={
                          Array.isArray(formik.touched.invoice_items) &&
                          formik.touched.invoice_items[index]?.amount
                            ? Array.isArray(formik.errors.invoice_items) &&
                              formik.errors.invoice_items[index]
                              ? (
                                  formik.errors.invoice_items[
                                    index
                                  ] as FormikErrors<InvoiceItemsTypes>
                                ).amount || null
                              : null
                            : null
                        }
                      />
                    </div>
                    {(formik.values.invoice_items?.length ?? 0) > 1 && (
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
                invoice_type: "per_hour",
                description: "",
                quantity: 1,
                unit_price: 0,
                discount: 0,
                amount: 0,
              };
              formik.setFieldValue("invoice_items", [
                ...(formik.values.invoice_items || []),
                newItem,
              ]);
            }}
            className={`${
              (formik.values.invoice_items?.length ?? 0) > 0 ? "mt-5" : ""
            } bg-primary-light text-text-strong text-xs px-[23px] py-[10px] rounded-[35px] font-medium md:text-base md:px-7 md:py-3 xlpy-[17px] xlpx-[43px] xl:mt-5 xl:text-lg cursor-pointer`}
          >
            Add New Item
          </button>
        </div>
        {/* {formik.errors.invoice_items && (
            <p className="mt-2 text-[#b40000]">{formik.errors.invoice_items}</p>
          )} */}

        <hr className="border-[#BFBFBF99] mt-10" />

        <section className="flex flex-col items-end bg-geen-400">
          <div className="myContainer border-b border-[#bfbfbf99] pt-[35px] pb-[18px] lg:pb-[33px] flex justify-between items-center min-w-[600px] max-w-3xl gap-4">
            <h5 className="text-sm font-bold leading-[25px] md:text-lg whitespace-nowrap">
              Net Total
            </h5>
            <h5 className="text-sm font-bold leading-[25px] md:text-lg truncate">
              {netTotal}
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
            <div className=" flex justify-between h-[43px] md:h-[48px] border border-primary overflow-hidden dark:border-white items-center gap-[10px] rounded-[6px] ">
              <h5 className="text-sm font-bold leading-[25px] py-3 px-4 w-[74px] text-white bg-primary dark:text-text-strong dark:bg-white md:text-lg">
                Total
              </h5>
              <h5 className="truncate text-sm font-bold leading-[25px] md:text-lg py-3 px-4">
                {formatCurrency(total)}
              </h5>
            </div>
          </div>
        </section>

        <section className="myContainer">
          <div className="mt-10 flex flex-col gap-4 md:gap-[30px]">
            <div className="max-w-[300px] w-full">
              <InputField
                name="due_date"
                label="Due Date"
                type="date"
                value={formik.values.due_date || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.due_date
                    ? formik.errors.due_date || null
                    : null
                }
              />
            </div>
            {/* <TextAreaField
              name="note"
              label="Add Note"
              placeholder="Add additional note like thank you note, return policy or others"
              value={formik.values.note}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.note ? formik.errors.note || null : null}
            /> */}
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
            <AppButton
              loading={isPending}
              disabled={isPending || !(formik.isValid || formik.dirty)}
              type="submit"
              size="sm"
              className="w-full max-w-[450px]"
            >
              Proceed
            </AppButton>
          </div>
        </section>
      </form>
    </div>
  );
}
