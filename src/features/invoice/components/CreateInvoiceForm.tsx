"use client";
import { SignUpSchema } from "../../../lib/validations/authValidations";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import InputField from "../../../components/ui/custom/InputField";
import {
  InvoiceFormValues,
  invoiceSchema,
} from "../../../lib/validations/invoiceValidations";
import { GoUpload } from "react-icons/go";
import { useState } from "react";
import { Textarea } from "../../../components/ui/textarea";
import { useMediaQuery } from "../../../hooks/use-media-query";
import MobileAddItems from "./MobileAddItems";

export default function CreateInvoiceForm() {
  const isDesktop = useMediaQuery("(min-width: 768px)");

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
      items: [
        {
          description: "",
          quantity: 1,
          unitPrice: 0,
          amount: 0,
        },
      ],
      subtotal: 0,
      tax: 0,
      discount: 0,
      total: 0,
    },
  });

  function onSubmit(values: InvoiceFormValues) {
    console.log("Submitted:", values);
  }

  return (
    <div className="">
      <div className="max-w-[1200px] mxauto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* --------------------------------
              Logo Upload FIELD
          -------------------------------- */}
            <div className="flex justify-between gap-5 custom-container">
              <h2 className="text-lg sm:text-2xl lg:text-[36px]">
                Add your details to generate invoice
              </h2>
              <FormField
                control={form.control}
                name="logo"
                render={({ field, fieldState }) => {
                  const [preview, setPreview] = useState<string | null>(null);

                  return (
                    <FormItem>
                      <FormControl>
                        <div className="space-y-2">
                          {/* Hidden file input */}
                          <input
                            placeholder="logo"
                            type="file"
                            className="hidden"
                            id="logo-upload"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                field.onChange(file);

                                // Create preview URL
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  setPreview(reader.result as string);
                                };
                                reader.readAsDataURL(file);
                              } else {
                                field.onChange(null);
                                setPreview(null);
                              }
                            }}
                          />
                          {fieldState.error && (
                            <p className="text-sm text-red-500">
                              {fieldState.error.message}
                            </p>
                          )}

                          {/* Custom trigger button with preview */}
                          <label
                            htmlFor="logo-upload"
                            className={`inline-flex flex-col items-center justify-center  rounded-[5px]  hover:bg-primary-500 hover:text-white cursor-pointer transition-colors duration-150 gap-1 min-h-[70px] min-w-20 border-2 border-dashed border-primary-50 overflow-hidden relative sm:min-w-40 sm:min-h-[120px] ${
                              preview
                                ? "w-20 h-[70px] bg-transparent sm:w-40 sm:h-[120px]"
                                : "px-5 py-2 bg-primary-20"
                            } `}
                          >
                            {preview ? (
                              <div className="w-full h-full">
                                <img
                                  src={preview}
                                  alt="Logo preview"
                                  className="h-full w-full object-contain"
                                />
                              </div>
                            ) : (
                              <>
                                <GoUpload className="text-[20px] sm:text-3xl" />
                                <span className="text-center text-[10px] leading-3 sm:text-base sm:leading-6">
                                  Upload <br /> logo
                                </span>
                              </>
                            )}
                          </label>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>

            <div className="space-y-[15px] lg:space-y-5 lg:w-1/2 custom-container">
              <FormField
                control={form.control}
                name="clientName"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Bill To</FormLabel>

                    <FormControl>
                      <div>
                        <InputField
                          {...field}
                          label=""
                          placeholder="Recepient Name"
                          type="text"
                          error={fieldState.error?.message ?? null}
                        />
                      </div>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>

                    <FormControl>
                      <InputField
                        {...field}
                        label=""
                        placeholder="Recipient Email"
                        type="email"
                        error={fieldState.error?.message ?? null}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Address */}
              <FormField
                control={form.control}
                name="address"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Address/Country of Residence</FormLabel>

                    <FormControl>
                      <InputField
                        {...field}
                        label=""
                        placeholder="address"
                        type="text"
                        error={fieldState.error?.message ?? null}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="custom-container">
              <h3 className="mt-10 text-sm lg:text-[22px] lg:mt-20">
                Invoice Items
              </h3>

              {isDesktop ? <div>desk</div> : <MobileAddItems />}
            </div>

            <hr className="border-neutral-600" />

            <div className="custom-container text-sm flex justify-between">
              <div className="">Sub Total</div>
              <div className="font-bold">$0.00</div>
            </div>
            <hr className="border-neutral-600" />

            <div className="custom-container text-sm flex justify-between items-center">
              <div className="flex items-center gap-1 ">
                <div>Discount (%)</div>
                <FormField
                  control={form.control}
                  name="discount"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      {/* <FormLabel>Due Date</FormLabel> */}

                      <FormControl>
                        <InputField
                          {...field}
                          label=""
                          placeholder="0"
                          type="number"
                          className="mb-1 w-[58px] h-[31px] text-xs font-medium"
                          error={fieldState.error?.message ?? null}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="font-bold">$0.00</div>
            </div>

            {/* TOTAL */}
            <div className="my-10 custom-container">
              <div className="border border-primary-500">Total</div>
            </div>

            {/* <hr className="border-neutral-600" /> */}

            <div className="space-y-[15px] lg:space-y-5 lg:w-1/2 custom-container">
              {/* Due Date */}
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Due Date</FormLabel>

                    <FormControl>
                      <InputField
                        {...field}
                        label=""
                        placeholder=""
                        type="date"
                        error={fieldState.error?.message ?? null}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* notes */}
              <FormField
                control={form.control}
                name="notes"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Add Note</FormLabel>

                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Add additional note like thank you, return policy or other information."
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
