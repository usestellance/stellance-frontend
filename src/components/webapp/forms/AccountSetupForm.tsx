"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import { accountSetupValidation } from "../../../lib/validations/userValidations";
import InputField from "../ui/InputField";
import AppButton from "../ui/AppButton";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { countryCodes } from "../../../utils/contents/countryCodes";
import ComboboxField from "../ui/ComboboxField";
import { Description, Field, Input, Label } from "@headlessui/react";

interface IAccountSetUp {
  firstName: string;
  lastName: string;
  businessName: string;
  countryCode: string;
  phoneNumber: string;
  walletAddress: string;
  country: string;
}

export default function AccountSetupForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const countryOptions = countryCodes.map((c) => ({
    label: c.country,
    value: c.country.toLowerCase(),
  }));

  // const phoneCodes = countryCodes.map((c) => ({
  //   label: c.country,
  //   value: c.code,
  // }));

  const formik = useFormik<IAccountSetUp>({
    initialValues: {
      firstName: "",
      lastName: "",
      businessName: "",
      countryCode: "",
      phoneNumber: "",
      walletAddress: "",
      country: "",
    },
    validationSchema: accountSetupValidation,
    onSubmit: (values) => {
      setLoading(true);
      console.log(values);

      let phoneNumber = values.phoneNumber.trim();
      if (phoneNumber.startsWith("0")) {
        phoneNumber = phoneNumber.substring(1);
      }

      // const phone = countryCode.code + phoneNumber;

      router.push("#");

      setTimeout(() => {
        setLoading(false);
        toast.success("Submitted Successfully");
      }, 1000);
    },
  });

  return (
    <div>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-[14px] sm:gap-7"
      >
        <InputField
          name="firstName"
          label="First Name"
          placeholder="First name"
          type="text"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.firstName ? formik.errors.firstName || null : null
          }
        />
        <InputField
          name="lastName"
          label="Last Name"
          placeholder="Last name"
          type="text"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.lastName ? formik.errors.lastName || null : null
          }
        />
        <InputField
          name="businessName"
          label="Business Name"
          placeholder="Business name"
          type="text"
          value={formik.values.businessName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.businessName
              ? formik.errors.businessName || null
              : null
          }
        />

        <InputField
          name="walletAddress"
          label="Stellar Wallet Address"
          placeholder="G..."
          type="text"
          value={formik.values.walletAddress}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.walletAddress
              ? formik.errors.walletAddress || null
              : null
          }
        />

        {/* Phone Number and country code */}
        <Field>
          <Label htmlFor="phoneNumber" className="label-class">
            Phone Number
          </Label>

          <div className="relative flex gap-2">
            {/* Country Code Input */}
            <div className="basis-1/4">
              <Input
                id="countryCode"
                name="countryCode"
                type="text"
                placeholder="+234"
                value={formik.values.countryCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`input-class
                ${
                  formik.touched.countryCode && formik.errors.countryCode
                    ? "border-[#B40000E5] text-[#B40000]"
                    : "border-[#AAAAAA]"
                }`}
              />
            </div>

            {/* Phone Number Input */}
            <div className="flex-1">
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                placeholder="000 0000 000"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`input-class
                  ${
                    formik.touched.phoneNumber && formik.errors.phoneNumber
                      ? "border-[#B40000E5] text-[#B40000]"
                      : "border-[#AAAAAA]"
                  }`}
              />
            </div>
          </div>

          {/* Error Message */}
          {(formik.touched.phoneNumber && formik.errors.phoneNumber) ||
          (formik.touched.countryCode && formik.errors.countryCode) ? (
            <Description className="mt-1 text-xs text-[#B40000] flex flex-col gap-1">
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <span>{formik.errors.phoneNumber}</span>
              )}
              {formik.touched.countryCode && formik.errors.countryCode && (
                <span>{formik.errors.countryCode}</span>
              )}
            </Description>
          ) : null}
        </Field>

        <ComboboxField
          name="country"
          label="Country"
          value={
            countryOptions.find(
              (option) => option.value === formik.values.country
            ) || null
          }
          onChange={(option) => formik.setFieldValue("country", option.value)}
          // onBlur={() => formik.setFieldTouched("country", true)}
          options={countryOptions}
          error={formik.touched.country ? formik.errors.country || null : null}
        />

        <AppButton
          type="submit"
          className="w-full mt-5 sm:hidden"
          disabled={!(formik.isValid && formik.dirty)}
          loading={loading}
        >
          Submit
        </AppButton>
        <AppButton
          loading={loading}
          type="submit"
          className="w-full mt-5"
          customTheme="bg-white text-primary max-sm:hidden dark:text-white dark:bg-secondary"
          disabled={!(formik.isValid && formik.dirty)}
        >
          Submit
        </AppButton>
      </form>
    </div>
  );
}
