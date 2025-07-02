/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Dialog, DialogPanel, Input } from "@headlessui/react";
import { useFormik } from "formik";
import { addItemValidation } from "../../../lib/validations/invoiceValidation";
import { useEffect, useState } from "react";
import { useInvoiceItems } from "../../../store/invoiceStore";
import { toast } from "sonner";
import { InvoiceItemsTypes } from "../../../lib/types/invoiceType";
import { AiFillCopy } from "react-icons/ai";
import AppButton from "../ui/AppButton";
import { usePaymentModalStore } from "../../../store/modals";

export default function PaymentMethodModal() {
  const { closeModal, isModalOpen } = usePaymentModalStore();
  const [madePayment, setMadePayment] = useState(false);
  const [transId, setTransId] = useState("");
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
        className="bg-[#1D1D1D57]  relative z-[10001] focus:outline-none"
        onClose={handleCloseModal}
        __demoMode
      >
        <div className="fixed top-0 left-0 right-0 bottom-0 inset0 w-screen overflow-y-auto bg-[#1D1D1D57] ">
          <div className="flex min-h-full items-center justify-center">
            <DialogPanel
              transition
              className="w-full rounded-[10px] bg-white dark:bg-primary text-text-strong myContainer backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 max-w-lg"
            >
              {!madePayment ? (
                <div className="pt-[10px] pb-20 ">
                  <p className="text-text-strong dark:text-white text-sm md:text-lg font-bold text-center px-1 mt-[40px]">
                    Copy the wallet Address below to pay this invoice
                    externally. Please take note of your transaction ID
                  </p>

                  <div className="px-4">
                    <div className="flex h-[43px] mt-[30px] md:h-[48px] md:mt-[40px]">
                      <div className="w-full h-full flex items-center border-r-0 truncate px-[13px] py-[14px] bg-[#AAAAAA66] rounded-bl-[6px] rounded-tl-[6px] text-xs md:text-lg lg:px-5 dark:text-white text-text-strong">
                        <p className="max-w-[60%] font-medium">
                          GC7OHFPWPSWXL4HMN6TXAG54MTZSMJIASWHO6KVRQNHNCXEAHWDSGGC3
                        </p>
                      </div>
                      <button
                        // onClick={handleCopy}
                        className="px-[24px] md:px-4 flex items-center justify-center bg-[#D9E4F8] border border-[#D9E4F8] rounded-br-[6px] rounded-tr-[6px] text-text-strong gap-[10px] cursor-pointer"
                      >
                        <AiFillCopy className="text-xl lg:text-[35px]" />
                        <span className="max-md:hidden font-medium">Copy</span>
                      </button>
                    </div>
                  </div>
                  <p
                    onClick={() => setMadePayment(true)}
                    className="cursor-pointer text-[#4285F4] font-bold text-sm text-center mt-[30px] md:text-lg md:mt-[40]"
                  >
                    I have made this payment
                  </p>
                </div>
              ) : (
                <div className="px-4 pt-[10px] pb-10 ">
                  <p className="text-text-strong dark:text-white text-sm md:text-lg font-bold text-center px-1 mt-[40px]">
                    Kindly provide the payment transaction ID for this invoice
                  </p>

                  <Input
                    value={transId}
                    onChange={(e) => setTransId(e.target.value)}
                    placeholder="Enter transaction ID"
                    className="input-class mt-[30px] md:mt-[36px]"
                  />

                  <AppButton size="sm" className="mx-auto mt-[30px] md:w-full">
                    Submit
                  </AppButton>
                </div>
              )}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
