/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useFormik } from "formik";
import React, { useEffect } from "react";
// import { toast } from "sonner";
import { invoiceValidation } from "../../../lib/validations/invoiceValidation";
import InputField from "../ui/InputField";
// import TextAreaField from "../ui/TextAreaField";
import AppButton from "../ui/AppButton";
import InvoiceItemsCard from "../InvoiceItemsCard";
import { useAddItemModal } from "../../../store/modals";
import { useInvoiceItems } from "../../../store/invoiceStore";
import {
  calculateNetTotal,
  calculateServiceFee,
  calculateTotal,
  formatCurrency,
} from "../../../utils/helpers/helperFunctions";
import { SERVICE_CHARGE } from "../../../utils/Constants";
import { InvoiceType } from "../../../lib/types/invoiceType";
import { countryCodes } from "../../../utils/contents/countryCodes";
import ComboboxField from "../ui/ComboboxField";
import { useCreateInvoice } from "../../../hooks/useInvoice";

export default function CreateInvoice() {
  const { openModal } = useAddItemModal();
  const { mutate, isPending } = useCreateInvoice();
  const { items, removeItem, clearItems, setEditingIndex } = useInvoiceItems();

  const total = calculateTotal(items);
  // const subtotal = formatCurrency(subtotalValue);
  const serviceCharge = formatCurrency(calculateServiceFee(total));
  const netTotal = formatCurrency(
    calculateNetTotal(total, calculateServiceFee(total))
  );

  // console.log(items);

  const formik = useFormik<InvoiceType>({
    // enableReinitialize: true,
    initialValues: {
      title: "",
      payer_name: "",
      payer_email: "",
      country: "",
      invoice_items: items,
      due_date: "",
      service_fee: SERVICE_CHARGE,
    },
    validationSchema: invoiceValidation,
    onSubmit: (values) => {
      // console.log(values);
      mutate(values);

      setEditingIndex(null);
    },
  });

  // console.log(formik.errors);
  useEffect(() => {
    formik.setFieldValue("invoice_items", items);
  }, [items]);

  const countryOptions = countryCodes.map((c) => ({
    label: c.country,
    value: c.country.toLowerCase(),
  }));

  return (
    <div className="md:mt-[60px]">
      <h1 className="text-2xl font-bold mb-4 myContainer md:hidden">
        Create Invoice
      </h1>
      <form onSubmit={formik.handleSubmit} className="">
        <div className="myContainer flex flex-col gap-4 md:gap-[30px]">
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
          <h2 className="section-subtitle mb-5">Invoice Items</h2>
          <div className="flex flex-col gap-[26px]">
            {formik?.values?.invoice_items?.map((item, index) => (
              <InvoiceItemsCard
                key={index}
                invoice_type={item.invoice_type}
                amount={item.amount}
                description={item.description}
                discount={item.discount}
                quantity={item.quantity}
                unit_price={item.unit_price}
                removeItem={() => removeItem(index)}
                editItem={() => {
                  setEditingIndex(index);
                  openModal();
                }}
              />
            ))}
          </div>
          <div>
            <button
              type="button"
              onClick={openModal}
              className={`${
                items.length > 0 ? "mt-5" : ""
              } bg-primary-light text-text-strong text-xs px-[23px] py-[10px] rounded-[35px] font-medium md:py-[12px] md:text-base lg:py-[17px] lg:px-[43px] lg:text-lg`}
            >
              Add New Item
            </button>
            {formik.errors.invoice_items && (
              <p className="mt-2 text-xs text-[#b40000]">
                {formik.errors.invoice_items}
              </p>
            )}
          </div>
        </div>
        <hr className="border-[#BFBFBF99] mt-10" />

        <div className="myContainer pt-[35px] pb-[18px] flex justify-between items-center">
          <h5 className="text-sm font-bold leading-[25px]">Net Total</h5>
          <h5 className="text-sm font-bold leading-[25px]">{netTotal}</h5>
        </div>

        <hr className="border-[#BFBFBF99]" />

        <section className="myContainer">
          <div className="pt-[18px] pb-9 flex justify-between items-center">
            <div className="flex gap-1">
              <h5 className="text-sm font-bold leading-[25px] whitespace-nowrap flex-1">
                Service charge (%)
              </h5>
              <div className=" border border-[#AAAAAA] font-medium text-xs h-[30px] w-[58px] flex items-center justify-center px-[10px] py-[6px] rounded-[6px] text-center">
                {SERVICE_CHARGE}
              </div>
            </div>
            <h5 className="text-sm font-bold leading-[25px]">
              {serviceCharge}
            </h5>
          </div>

          <div className="flex justify-between h-[43px] overflow-hidden border border-primary  dark:border-white items-center gap-[10px] rounded-[6px]">
            <h5 className="text-sm font-bold leading-[25px] py-3 px-4 w-[74px]  text-white bg-primary dark:text-text-strong dark:bg-white">
              Total
            </h5>
            <h5 className="text-sm font-bold leading-[25px] py-3 px-4 ">
              {formatCurrency(total)}
            </h5>
          </div>

          <div className="mt-10 flex flex-col gap-4">
            <InputField
              name="due_date"
              label="Due Date"
              type="date"
              value={formik.values.due_date || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.due_date ? formik.errors.due_date || null : null
              }
            />

            {/* <TextAreaField
              name="note"
              label="Add Note"
              //   rows={10}
              placeholder="Add additional note like thank you note, return policy or others"
              value={formik.values.note}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.note ? formik.errors.note || null : null}
            /> */}
          </div>

          <div className="flex justify-center gap-[25px] mt-[50px]">
            <AppButton onClick={clearItems} size="sm" theme="tetiary">
              Cancel
            </AppButton>
            <AppButton
              loading={isPending}
              disabled={isPending || !(formik.dirty || formik.isValid)}
              type="submit"
              size="sm"
            >
              Proceed
            </AppButton>
          </div>
        </section>
      </form>
    </div>
  );
}
