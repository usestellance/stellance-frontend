/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
// import { useState } from "react";
import { useAddItemModal } from "../../../store/modals";
import AppButton from "../ui/AppButton";
import { useFormik } from "formik";
import SelectField from "../ui/SelectField";
import InputField from "../ui/InputField";
import { addItemValidation } from "../../../lib/validations/invoiceValidation";
import { useEffect } from "react";
import { useInvoiceItems } from "../../../store/invoiceItemsStore";
import { toast } from "sonner";
import { InvoiceItemsTypes } from "../../../lib/types/invoiceType";

export default function AddItemsModal() {
  const { closeModal, isModalOpen } = useAddItemModal();
  const { addItem, updateItem, editingIndex, setEditingIndex, items } =
    useInvoiceItems();

  const formik = useFormik<InvoiceItemsTypes>({
    initialValues: {
      invoice_type: "",
      description: "",
      quantity: 1,
      unit_price: 0,
      discount: 0,
      amount: 0,
    },
    validationSchema: addItemValidation,
    onSubmit: (values) => {
      if (editingIndex !== null) {
        updateItem(values); // Update the item
        toast.success("Item updated");
      } else {
        addItem(values); // Add new item
        toast.success("Item added");
      }
      // console.log(values);
      formik.resetForm();
      setEditingIndex(null);
      closeModal();
    },
  });

  const handleCloseModal = () => {
    closeModal();
    formik.resetForm();
  };

  useEffect(() => {
    const { quantity, unit_price, discount } = formik.values;
    const subtotal = unit_price * quantity;
    const discounted = subtotal * (1 - discount / 100);
    formik.setFieldValue("amount", parseFloat(discounted.toFixed(2)));
  }, [
    formik.values.quantity,
    formik.values.unit_price,
    formik.values.discount,
  ]);

  useEffect(() => {
    if (editingIndex !== null) {
      formik.setValues(items[editingIndex]);
    }
  }, [editingIndex]);

  return (
    <>
      <Dialog
        open={isModalOpen}
        as="div"
        className="bg-[#1D1D1D57]  relative z-[10001] focus:outline-none md:hidden"
        onClose={handleCloseModal}
        __demoMode
      >
        <div className="fixed top-0 left-0 right-0 bottom-0 inset0 w-screen overflow-y-auto bg-[#1D1D1D57] ">
          <div className="flex min-h-full items-end justify-center">
            <DialogPanel
              transition
              className="w-full rounded-tr-[10px] rounded-tl-[10px] bg-white dark:bg-primary text-text-strong myContainer pt-[18px] pb-11 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <DialogTitle
                as="h3"
                className="text-sm sm:text-lg font-medium dark:text-white"
              >
                Add Item
              </DialogTitle>

              <form
                onSubmit={formik.handleSubmit}
                className="flex flex-col gap-[14px] mt-4 text-text-strong dark:text-white"
              >
                <SelectField
                  className="input-class"
                  name="invoice_type"
                  label="Invoice Type"
                  options={[
                    { label: "Per Hour", value: "per_hour" },
                    { label: "Per Unit", value: "per_unit" },
                  ]}
                  value={formik.values.invoice_type}
                  onChange={(val) => formik.setFieldValue("invoice_type", val)}
                  onBlur={() => formik.setFieldTouched("invoice_type", true)}
                  error={
                    formik.touched.invoice_type
                      ? formik.errors.invoice_type || null
                      : null
                  }
                />

                <InputField
                  name="description"
                  label="Description"
                  placeholder="Job Description"
                  type="text"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.description
                      ? formik.errors.description || null
                      : null
                  }
                />

                <InputField
                  name="quantity"
                  label="Quantity"
                  placeholder="Enter quantity per unit/hr"
                  type="number"
                  value={formik.values.quantity}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.quantity
                      ? formik.errors.quantity || null
                      : null
                  }
                />

                <InputField
                  name="unit_price"
                  label="Unit Price"
                  placeholder="Enter unit price per unit/hr"
                  type="number"
                  value={formik.values.unit_price}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.unit_price
                      ? formik.errors.unit_price || null
                      : null
                  }
                />

                <InputField
                  name="discount"
                  label="Discount (%)"
                  placeholder="Enter discount (optional)"
                  type="number"
                  value={formik.values.discount}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.discount
                      ? formik.errors.discount || null
                      : null
                  }
                />

                <InputField
                  name="amount"
                  label="Amount"
                  placeholder="Default calculated price"
                  type="number"
                  value={formik.values.amount}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  readonly
                  error={
                    formik.touched.amount ? formik.errors.amount || null : null
                  }
                />

                <div className="mt-4 flex justify-center gap-[25px]">
                  <AppButton
                    theme="tetiary"
                    size="sm"
                    className=""
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </AppButton>
                  <AppButton
                    disabled={!(formik.isValid || formik.dirty)}
                    type="submit"
                    size="sm"
                  >
                    Add Item
                  </AppButton>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
