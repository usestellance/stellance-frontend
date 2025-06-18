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

interface Items {
  invoiceType: string;
  description: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  amount: number;
}

export default function AddItemsModal() {
  const { closeModal, isModalOpen } = useAddItemModal();
  const { addItem, updateItem, editingIndex, setEditingIndex, items } =
    useInvoiceItems();

  const formik = useFormik<Items>({
    initialValues: {
      invoiceType: "",
      description: "",
      quantity: 1,
      unitPrice: 0,
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
      console.log(values);
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
    const { quantity, unitPrice, discount } = formik.values;
    const subtotal = unitPrice * quantity;
    const discounted = subtotal * (1 - discount / 100);
    formik.setFieldValue("amount", parseFloat(discounted.toFixed(2)));
  }, [formik.values.quantity, formik.values.unitPrice, formik.values.discount]);

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
        onClose={closeModal}
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
                  name="invoiceType"
                  label="Invoice Type"
                  options={[
                    { label: "Per Hour", value: "perHour" },
                    { label: "Per Unit", value: "perUnit" },
                  ]}
                  value={formik.values.invoiceType}
                  onChange={(val) => formik.setFieldValue("invoiceType", val)}
                  onBlur={() => formik.setFieldTouched("invoiceType", true)}
                  error={
                    formik.touched.invoiceType
                      ? formik.errors.invoiceType || null
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
                  name="unitPrice"
                  label="Unit Price"
                  placeholder="Enter unit price per unit/hr"
                  type="number"
                  value={formik.values.unitPrice}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.unitPrice
                      ? formik.errors.unitPrice || null
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
                  <AppButton type="submit" size="sm">
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
