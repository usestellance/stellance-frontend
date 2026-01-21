"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GoUpload } from "react-icons/go";
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
  FormMessage,
} from "../../../../../components/ui/form";
import InputField from "../../../../../components/ui/custom/InputField";
import { Textarea } from "../../../../../components/ui/textarea";
import { Button } from "../../../../../components/ui/button";
import InvoiceItemsCard from "./InvoiceItemsCard";
// import { invoiceItems } from "../../../../../lib/utils";
import AddInvoiceItemDrawer from "./AddInvoiceItemDrawer";
import { useRouter } from "next/navigation";
import { invoiceRoutes } from "../../../../../config/routes";
import { useToast } from "../../../../../hooks/useToast";
import { useCreateInvoice } from "../../../hooks";
import { Checkbox } from "../../../../../components/ui/checkbox";
import { Label } from "../../../../../components/ui/label";

export default function CreateInvoiceFormMobile() {
  const {
    items,
    openDrawer,
    setOpenDrawer,
    setEditingIndex,
    removeItem,
    clearItems,
  } = useInvoiceItems();
  const toast = useToast();
  // const [loading, setLoading] = useState(false);
  const router = useRouter();
  const createInvoice = useCreateInvoice();
  const total = calculateTotal(items);
  const serviceFee = (total * SERVICE_CHARGE) / 100;
  const [make_default, setMake_default] = useState(true);
  const netTotal = formatCurrency(calculateNetTotal(total, serviceFee));

  const form = useForm<InvoiceFormValues>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      logo: undefined,
      title: "",
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

  // console.log("items", items);
  // console.log("RHF ITEMS:", form.watch("items"));

  // 🔁 Sync Zustand items → RHF
  useEffect(() => {
    form.setValue("items", items as InvoiceFormValues["items"]);
  }, [items]);

  // function onSubmit(values: InvoiceFormValues) {
  //   console.log("Items from Zustand:", items);
  //   console.log("Items length:", items.length);
  //   console.log("Form values:", values);
  //   const stored = localStorage.getItem("invoice-template");

  //   const template_id = stored
  //     ? JSON.parse(stored).state.selectedTemplate
  //     : "template_001";

  //     createInvoice.mutate({
  //     title: values.title, // or dynamic title
  //     payer_name: values.clientName,
  //     payer_email: values.email,
  //     country: values.address,
  //     due_date: values.dueDate,
  //     invoice_items: values.items,
  //     service_fee: serviceFee,
  //     template_id, // REQUIRED
  //     logo: values.logo,
  //     filename: values.logo?.name,
  //     make_default,
  //     items: values.items,
  //   });
  //   // setLoading(true);
  //   // console.log("Submitted invoice:", values);
  //   // setTimeout(() => {
  //   //   setLoading(false);
  //   //   router.push(invoiceRoutes.INVOICES);
  //   //   toast.success("Invoice Created Successfully");
  //   //   clearItems();
  //   // }, 2000);
  // }

  // console.log("FORM VALUES:", form.getValues());
  function onSubmit(values: InvoiceFormValues) {
    // console.log("Items from Zustand:", items);
    // console.log("Items length:", items.length);
    // console.log("Form values:", values);

    if (items.length === 0) {
      toast.error("Please add at least one invoice item");
      return;
    }

    const stored = localStorage.getItem("invoice-template");
    const template_id = stored
      ? JSON.parse(stored).state.selectedTemplate
      : "template_001";

    const payload = {
      title: values.title,
      payer_name: values.clientName,
      payer_email: values.email,
      country: values.address,
      due_date: values.dueDate,
      invoice_items: items,
      service_fee: serviceFee,
      template_id,
      logo: values.logo,
      make_default,
      note: values.notes,
    };

    // console.log("temp", template_id);
    // console.log("Invoice items being sent:", JSON.stringify(items));
    clearItems();
    createInvoice.mutate(payload);
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
                  <FormItem className="flex flex-col items-end ">
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
                          className={`inline-flex flex-col items-center justify-center rounded-[5px] cursor-pointer gap-1 min-h-20 h-20 max-h-20 min-w-20 max-w-20 border-2 border-dashed border-primary-50 sm:min-w-40 sm:min-h-40 sm:h-40 sm:max-w-40 sm:max-h-40 ${
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
                    <FormMessage />

                    <div className="flex items-center gap-1">
                      <Checkbox
                        id="make_default"
                        checked={make_default}
                        onCheckedChange={(checked) => {
                          setMake_default(checked === true);
                        }}
                        className="data-[state=checked]:text-primary-500 data-[state=checked]:bg-white size-4 data-[state=checked]:border-primary-100"
                      />

                      <Label
                        htmlFor="make_default"
                        className="text-[10px] whitespace-nowrap"
                      >
                        Set as default
                      </Label>
                    </div>
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
              render={({ field, fieldState }) => {
                // console.log("FIELD STATE:", fieldState, field);
                return (
                  <FormItem>
                    <FormLabel>Bill To</FormLabel>
                    <FormControl>
                      <InputField
                        {...field}
                        placeholder="Recipient Name"
                        error={fieldState.error?.message ?? null}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                );
              }}
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

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <InputField
                      {...field}
                      type="text"
                      placeholder="Invoice Title"
                      error={fieldState.error?.message ?? null}
                    />
                  </FormControl>

                  <FormMessage />
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
                  <FormMessage />
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
                type="button"
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
                    value={field.value ?? SERVICE_CHARGE}
                    type="number"
                    className="w-12 h-[31px] text-xs text-center"
                    readonly
                    disabled
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
                  <FormMessage />
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
                    <Textarea {...field} placeholder="Add additional note of max 150 characters" maxLength={150} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="flex max-w-full gap-[30px]  justify-center mt-10 lg:mt-[60px]">
            <Button
              onClick={() => router.back()}
              className="in-app-btn"
              variant="outline"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={createInvoice.isPending}
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
