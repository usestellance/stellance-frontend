"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GoUpload } from "react-icons/go";
import MobileAddItems from "../MobileAddItems";
import { useInvoiceItems } from "../../../../../store/useInvoiceStore";
import {
  InvoiceFormValues,
  invoiceSchema,
} from "../../../../../lib/validations/invoiceValidations";
import { SERVICE_CHARGE } from "../../../../../config/constants";
import {
  calculateNetTotal,
  calculateTotal,
  formatCurrency,
} from "../../../../../lib/utils/helpers";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "../../../../../components/ui/form";
import InputField from "../../../../../components/ui/custom/InputField";
import { Textarea } from "../../../../../components/ui/textarea";
import { Button } from "../../../../../components/ui/button";
import InvoiceItemsCard from "./InvoiceItemsCard";
import { invoiceItems } from "../../../../../lib/utils";
import AddInvoiceItemDrawer from "./AddInvoiceItemDrawer";

export default function CreateInvoiceFormMobile() {
  const { items, openDrawer, setOpenDrawer, setEditingIndex, removeItem } =
    useInvoiceItems();

  const total = calculateTotal(items);
  const serviceFee = (total * SERVICE_CHARGE) / 100;

  const netTotal = formatCurrency(calculateNetTotal(total, serviceFee));

  const form = useForm<InvoiceFormValues>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      logo: undefined,
      invoiceNumber: "",
      clientName: "",
      email: "",
      address: "",
      dueDate: "",
      notes: "",
      items: [],
      subtotal: 0,
      charge: SERVICE_CHARGE,
      // discount: 0,
      total: 0,
    },
  });

  // console.log("RHF ITEMS:", form.watch("items"));

  // 🔁 Sync Zustand items → RHF
  useEffect(() => {
    form.setValue("items", items as InvoiceFormValues["items"]);
  }, [items]);

  function onSubmit(values: InvoiceFormValues) {
    console.log("FINAL SUBMISSION:", values);
  }

  return (
    <div className="max-w-[1200px] mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* HEADER */}
          <div className="flex justify-between gap-5 custom-container">
            <h2 className="text-lg sm:text-2xl lg:text-[36px]">
              Add your details to generate invoice
            </h2>

            {/* LOGO UPLOAD */}
            <FormField
              control={form.control}
              name="logo"
              render={({ field }) => {
                const [preview, setPreview] = useState<string | null>(null);

                return (
                  <FormItem>
                    <FormControl>
                      <div>
                        <input
                          type="file"
                          className="hidden"
                          id="logo-upload"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            field.onChange(file);
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () =>
                                setPreview(reader.result as string);
                              reader.readAsDataURL(file);
                            }
                          }}
                        />

                        <label
                          htmlFor="logo-upload"
                          className={`inline-flex flex-col items-center justify-center rounded-[5px] cursor-pointer gap-1 min-h-[70px] min-w-20 max-w-20 border-2 border-dashed border-primary-50 sm:min-w-40 sm:min-h-[120px] sm:max-w-40 ${
                            preview ? "bg-transparent" : "bg-primary-20"
                          }`}
                        >
                          {preview ? (
                            <img
                              src={preview}
                              alt="logo"
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <>
                              <GoUpload className="text-xl sm:text-3xl" />
                              <span className="text-[10px] sm:text-base text-center">
                                Upload <br /> logo
                              </span>
                            </>
                          )}
                        </label>
                      </div>
                    </FormControl>
                  </FormItem>
                );
              }}
            />
          </div>

          {/* CLIENT DETAILS */}
          <div className="space-y-4 lg:w-1/2 custom-container">
            <FormField
              control={form.control}
              name="clientName"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Bill To</FormLabel>
                  <FormControl>
                    <InputField
                      {...field}
                      placeholder="Recipient Name"
                      error={fieldState.error?.message}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <InputField
                      {...field}
                      type="email"
                      placeholder="Recipient Email"
                      error={fieldState.error?.message ?? null}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <InputField
                      {...field}
                      placeholder="Recipient Country / Address"
                      error={fieldState.error?.message ?? null}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* ITEMS */}
          <div className="custom-container">
            <h3 className="mt-10 text-sm lg:text-[22px]">Invoice Items</h3>

            <div className="flex flex-col gap-[26px] mt-5">
              {items.map((item, i) => (
                <InvoiceItemsCard
                  key={i}
                  amount={item.amount}
                  description={item.description}
                  discount={item.discount || 0}
                  invoice_type={item.invoice_type}
                  quantity={item.quantity}
                  unit_price={item.unit_price}
                  editItem={() => {
                    setEditingIndex(i);
                    setOpenDrawer(true);
                  }}
                  removeItem={() => removeItem(i)}
                />
              ))}
            </div>

            <div>
              <Button
                onClick={() => setOpenDrawer(true)}
                className="bg-primary-50 text-black-500 font-medium text-xs w-[123px] h-9 mt-8 mb-3"
              >
                Add New Item
              </Button>
            </div>
          </div>

          <hr className="border-neutral-600" />

          {/* SUBTOTAL */}
          <div className="custom-container text-sm flex justify-between">
            <span>Sub Total</span>
            <span className="font-bold">{formatCurrency(total)}</span>
          </div>

          <hr className="border-neutral-600" />

          {/* DISCOUNT */}
          <div className="custom-container text-sm flex justify-between items-center">
            <div className="flex gap-2 items-center ">
              <span className="inline-block">Charge (%)</span>
              <FormField
                control={form.control}
                name="charge"
                render={({ field }) => (
                  <InputField
                    {...field}
                    type="number"
                    className="w-12 h-[31px] text-xs text-center"
                    readonly
                  />
                )}
              />
            </div>
            <span className="font-bold">{formatCurrency(serviceFee)}</span>
          </div>

          {/* TOTAL */}
          <div className="custom-container">
            <div className="my-10 border rounded-[5px] border-primary-500 text-sm flex justify-between items-center">
              <span className="bg-primary-500 px-[18px] py-[11px] font-bold text-neutral-500">
                Total
              </span>
              <span className="font-bold px-[15px] py-[11px] line-clamp-1">
                {netTotal}
              </span>
            </div>
          </div>

          {/* DUE DATE + NOTES */}
          <div className="space-y-4 lg:w-1/2 custom-container">
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Due Date</FormLabel>
                  <FormControl>
                    <InputField {...field} type="date" />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Add Note</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Add additional note" />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="flex max-w-full gap-[30px]  justify-center mt-10 lg:mt-[60px]">
            <Button
              onClick={() => "hello"}
              className="in-app-btn"
              variant="outline"
            >
              Preview
            </Button>
            <Button
              type="submit"
              // onClick={() => console.log("sumbit")}
              className="in-app-btn"
            >
              Proceed
            </Button>
          </div>
        </form>
      </Form>

      <AddInvoiceItemDrawer open={openDrawer} onOpenChange={setOpenDrawer} />
    </div>
  );
}
