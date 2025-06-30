"use client";
import React, { useMemo } from "react";
import { useFormik } from "formik";
import InputField from "../ui/InputField";
import AppButton from "../ui/AppButton";
// import { IUser } from "../../../lib/types/userTypes";
import { useUpdateProfile } from "../../../hooks/useUser";
import { changePasswordValidation } from "../../../lib/validations/userValidations";
import { useChangePasswordModalStore } from "../../../store/modals";
import { getPasswordStrength } from "../../../utils/helpers/passwordStrength";
// import { userAuth } from "../../../store/userAuth";

interface IChangePassword {
  current_password: string;
  new_password: string;
  confirm_new_password: string;
}

export default function ChangePasswordForm() {
  const { closeModal } = useChangePasswordModalStore();
  //   const { credentials: userDetails } = userAuth();
  //   const user = userDetails?.user;
  const { isPending } = useUpdateProfile();

  const formik = useFormik<IChangePassword>({
    initialValues: {
      current_password: "",
      new_password: "",
      confirm_new_password: "",
    },
    validationSchema: changePasswordValidation,
    onSubmit: async (values) => {
      console.log(values);
      //   const { new_password,current_password } =values;
      //   mutate(values);
    },
  });

  const strength = useMemo(
    () => getPasswordStrength(formik.values.new_password || ""),
    [formik.values.new_password]
  );

  return (
    <div className="">
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-[14px] sm:gap-7"
      >
        <InputField
          name="current_password"
          label="Current Password"
          placeholder="Current Password"
          type="password"
          value={formik.values.current_password || ""}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.current_password
              ? formik.errors.current_password || null
              : null
          }
        />
        <div>
          <InputField
            name="new_password"
            label="New Password"
            placeholder="New Password"
            type="password"
            value={formik.values.new_password || ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.new_password
                ? formik.errors.new_password || null
                : null
            }
          />{" "}
          {formik.values.new_password && formik.values.new_password.length > 0 && (
            <div className="mt-2">
              <div className="w-full h-2 bg-[#cccccc] rounded-[6px] overflow-hidden">
                <div
                  className={`h-full ${strength.color}`}
                  style={{ width: `${(strength.score / 4) * 100}%` }}
                />
              </div>
              <p className="mt-1 text-xs font-medium ">{strength.label}</p>
            </div>
          )}
        </div>
        <InputField
          name="confirm_new_password"
          label="Confirm Password"
          placeholder="Confirm Password"
          type="password"
          value={formik.values.confirm_new_password || ""}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.confirm_new_password
              ? formik.errors.confirm_new_password || null
              : null
          }
        />
        <div className="mt-5 flex justify-center gap-[25px]">
          <AppButton
            onClick={closeModal}
            size="sm"
            theme="tetiary"
            className="w-fit sm:hidden"
          >
            Cancel
          </AppButton>
          <AppButton
            size="sm"
            type="submit"
            className="w-fit sm:hidden"
            disabled={isPending || !(formik.isValid && formik.dirty)}
            loading={isPending}
          >
            Update
          </AppButton>
        </div>
        <div className="mt-5 flex justify-center gap-[25px] md:mt-0">
          <AppButton
            onClick={closeModal}
            size="lg"
            theme="tetiary"
            className="w-full max-sm:hidden"
          >
            Cancel
          </AppButton>
          <AppButton
            size="lg"
            loading={isPending}
            type="submit"
            className="w-full max-sm:hidden"
            disabled={isPending || !(formik.isValid && formik.dirty)}
          >
            Update
          </AppButton>
        </div>

        <div></div>
      </form>
    </div>
  );
}
