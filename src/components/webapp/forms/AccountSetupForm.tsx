"use client";
import React from "react";
import { useFormik } from "formik";
import { accountSetupValidation } from "../../../lib/validations/userValidations";
import InputField from "../ui/InputField";
import AppButton from "../ui/AppButton";
// import { useRouter } from "next/navigation";
import { countryCodes } from "../../../utils/contents/countryCodes";
import ComboboxField from "../ui/ComboboxField";
// import { createFirstInvoiceRoute } from "../../../utils/route";
import { IUser } from "../../../lib/types/userTypes";
import { useCompleteProfile } from "../../../hooks/useUser";
// import useAxiosAuth from "../../../hooks/useAxiosAuth";

export default function AccountSetupForm() {
  // const router = useRouter();
  // const axiosAuth = useAxiosAuth();
  const { mutate, isPending } = useCompleteProfile();

  const countryOptions = countryCodes.map((c) => ({
    label: c.country,
    value: c.country.toLowerCase(),
  }));

  const formik = useFormik<IUser>({
    initialValues: {
      first_name: "",
      last_name: "",
      business_name: "",
      phone_number: "",
      country: "",
    },
    validationSchema: accountSetupValidation,
    onSubmit: async (values) => {
      console.log(values);
      const { business_name, country, first_name, last_name, phone_number } =
        values;

      // const response = await axiosInstance.post("/auth/clear")
      // const response = await axiosAuth.post("/profile", {
      //   first_name,
      //   last_name,
      //   phone_number,
      //   business_name,
      //   country: country,
      // });
      // console.log(response);
      mutate({ business_name, country, first_name, last_name, phone_number });
      // router.push(createFirstInvoiceRoute);
    },
  });

  return (
    <div>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-[14px] sm:gap-7"
      >
        <InputField
          className="input-class-auth"
          name="first_name"
          label="First Name"
          placeholder="First name"
          type="text"
          value={formik.values.first_name || ""}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.first_name ? formik.errors.first_name || null : null
          }
        />
        <InputField
          className="input-class-auth"
          name="last_name"
          label="Last Name"
          placeholder="Last name"
          type="text"
          value={formik.values.last_name || ""}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.last_name ? formik.errors.last_name || null : null
          }
        />

        <ComboboxField
          className="input-class-auth"
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
          error={formik.touched.country ? formik.errors.country || null : null}
        />
        <InputField
          className="input-class-auth"
          name="business_name"
          label="Business Name (Optional)"
          placeholder="Business name"
          type="text"
          value={formik.values.business_name || ""}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.business_name
              ? formik.errors.business_name || null
              : null
          }
        />
        <InputField
          className="input-class-auth"
          name="phone_number"
          label="Phone Number"
          placeholder="Phone Number"
          type="tel"
          value={formik.values.phone_number || ""}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.phone_number
              ? formik.errors.phone_number || null
              : null
          }
        />

        <AppButton
          size="lg"
          type="submit"
          className="w-full mt-5 sm:hidden"
          disabled={isPending || !(formik.isValid && formik.dirty)}
          loading={isPending}
        >
          Submit
        </AppButton>
        <AppButton
          size="lg"
          loading={isPending}
          type="submit"
          className="w-full mt-5"
          customTheme="bg-white text-primary max-sm:hidden dark:text-white dark:bg-secondary"
          disabled={isPending || !(formik.isValid && formik.dirty)}
        >
          Submit
        </AppButton>
      </form>
    </div>
  );
}
