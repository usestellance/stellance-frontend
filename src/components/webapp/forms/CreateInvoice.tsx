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
import {
  calculateNetTotal,
  calculateServiceFee,
  calculateTotal,
  formatCurrency,
} from "../../../utils/helpers/helperFunctions";
import { SERVICE_CHARGE } from "../../../utils/Constants";
import { InvoiceType } from "../../../lib/types/invoiceType";

export default function CreateInvoice({ inv }: { inv: string }) {
  const { openModal } = useAddItemModal();
  const { items, removeItem, clearItems, setEditingIndex } = useInvoiceItems();

  const total = calculateTotal(items);
  // const subtotal = formatCurrency(subtotalValue);
  const serviceCharge = formatCurrency(calculateServiceFee(total));
  const netTotal = formatCurrency(
    calculateNetTotal(total, calculateServiceFee(total))
  );

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
      items: items,
    },
    validationSchema: invoiceValidation,
    onSubmit: (values) => {
      console.log(values);
      toast.success("Invoice Created");
      //   clearItems();
      setEditingIndex(null);
    },
  });

  useEffect(() => {
    formik.setFieldValue("items", items);
  }, [items]);

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
            className={`${
              items.length > 0 ? "mt-5" : ""
            } bg-primary-light text-text-strong text-xs px-[23px] py-[10px] rounded-[35px] font-medium md:py-[12px] md:text-base lg:py-[17px] lg:px-[43px] lg:text-lg`}
          >
            Add New Item
          </button>
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

            <TextAreaField
              name="note"
              label="Add Note"
              //   rows={10}
              placeholder="Add additional note like thank you note, return policy or others"
              value={formik.values.note}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.note ? formik.errors.note || null : null}
            />
          </div>

          <div className="flex justify-center gap-[25px] mt-[50px]">
            <AppButton onClick={clearItems} size="sm" theme="tetiary">
              Cancel
            </AppButton>
            <AppButton type="submit" size="sm">
              Proceed
            </AppButton>
          </div>
        </section>
      </form>
    </div>
  );
}
