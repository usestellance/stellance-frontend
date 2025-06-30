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
import { useUpdateProfile } from "../../../hooks/useUser";
import { userAuth } from "../../../store/userAuth";
import { useChangePasswordModalStore } from "../../../store/modals";
// import useAxiosAuth from "../../../hooks/useAxiosAuth";

export default function UpdateProfileForm() {
  const { openModal } = useChangePasswordModalStore();
  const { logout } = userAuth();
  const { credentials: userDetails } = userAuth();
  const user = userDetails?.user;
  const { mutate, isPending } = useUpdateProfile();
  const countryOptions = countryCodes.map((c) => ({
    label: c.country,
    value: c.country.toLowerCase(),
  }));

  // console.log(user);

  const formik = useFormik<IUser>({
    enableReinitialize: true,
    initialValues: {
      email: user?.email,
      first_name: user?.first_name,
      last_name: user?.last_name,
      business_name: user?.business_name || "Odogwu and sons",
      phone_number: user?.phone_number || "09080716744",
      country: user?.country || "Nigeria",
      wallet_address: user?.wallet_address || "",
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
        <div className="flex gap-5 xl:gap-[54px]">
          <div className="flex-1">
            <InputField
              name="first_name"
              label="First Name"
              placeholder="First name"
              type="text"
              value={formik.values.first_name || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.first_name
                  ? formik.errors.first_name || null
                  : null
              }
            />
          </div>
          <div className="flex-1">
            <InputField
              name="last_name"
              label="Last Name"
              placeholder="Last name"
              type="text"
              value={formik.values.last_name || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.last_name
                  ? formik.errors.last_name || null
                  : null
              }
            />
          </div>
        </div>

        <div className="xl:max-w-1/2 flex flex-col gap-[14px] sm:gap-7">
          <ComboboxField
            className="input-class"
            name="country"
            label="Country (Residence)"
            value={
              countryOptions.find(
                (option) =>
                  option.value ===
                  (formik.values.country?.toLowerCase?.() ?? "")
              ) || null
            }
            // value={
            //   countryOptions.find(
            //     (option) => option.value === formik.values.country
            //   ) || null
            // }
            onChange={(option) => formik.setFieldValue("country", option.value)}
            // onBlur={() => formik.setFieldTouched("country", true)}
            options={countryOptions}
            error={
              formik.touched.country ? formik.errors.country || null : null
            }
          />
          <InputField
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
          <InputField
            name="email"
            label="Email"
            placeholder="hello@example.com"
            type="email"
            readonly
            value={formik.values.email || ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email ? formik.errors.email || null : null}
          />
          <InputField
            name="wallet_address"
            label="Wallet Address"
            placeholder="GC7OHFPWPS********HNCXEAHWDSGGC3"
            type="tel"
            readonly
            value={formik.values.wallet_address || ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.wallet_address
                ? formik.errors.wallet_address || null
                : null
            }
          />
        </div>
        <div
          onClick={openModal}
          className="text-[#B40000E5] cursor-pointer font-medium text-center mt-5 lg:text-xl"
        >
          Change Password
        </div>
        <AppButton
          size="lg"
          type="submit"
          className="w-fit mx-auto mt-5 sm:hidden"
          disabled={isPending || !(formik.isValid && formik.dirty)}
          loading={isPending}
        >
          Update
        </AppButton>
        <AppButton
          size="lg"
          loading={isPending}
          type="submit"
          className="w-full mt-5 max-sm:hidden"
          disabled={isPending || !(formik.isValid && formik.dirty)}
        >
          Update
        </AppButton>
        <div
          onClick={logout}
          className="text-[#B40000E5] font-medium text-center mt-3 lg:text-xl cursor-pointer"
        >
          Sign out
        </div>
      </form>
    </div>
  );
}
