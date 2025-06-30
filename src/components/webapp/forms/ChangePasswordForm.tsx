"use client";
import React from "react";
import { useFormik } from "formik";
import { accountSetupValidation } from "../../../lib/validations/userValidations";
import InputField from "../ui/InputField";
import AppButton from "../ui/AppButton";
import { IUser } from "../../../lib/types/userTypes";
import { useUpdateProfile } from "../../../hooks/useUser";
import { userAuth } from "../../../store/userAuth";

export default function UpdateProfileForm() {
  const { credentials: userDetails } = userAuth();
  const user = userDetails?.user;
  const { mutate, isPending } = useUpdateProfile();

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
      </form>
    </div>
  );
}
