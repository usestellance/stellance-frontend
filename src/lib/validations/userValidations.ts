import * as Yup from "yup";

// Helper function to validate password strength
export const isStrongPassword = (password: string) => {
  // Regex for strong passwords allowing more special characters
  return /^(?=.*[A-Za-z])(?=.*[\d!@#$%^&*(),.?":{}|<>;'[\]~\-_=+])[A-Za-z\d!@#$%^&*(),.?":{}|<>;'[\]~\-_=+]{8,}$/.test(
    password
  );
};

export const signUpValidation = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .test("not-email", "Can't contain your email address", function (value) {
      const { email } = this.parent; // Access the email field
      if (!value || !email) return true; // Skip validation if no value or email
      return !value.includes(email);
    })
    .test("min-chars", "At least 8 characters", (value) => {
      return value ? value.length >= 8 : false;
    })
    .test("number-or-symbol", "Contain a number or symbol", (value) => {
      return value ? /[\d@$!%*?&]/.test(value) : false;
    })
    .test("strength", "Password strength: Weak", (value) => {
      return value ? isStrongPassword(value) : false;
    })
    .required("Password is required"),
});

export const signInValidation = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});


export const accountSetupValidation = Yup.object().shape({
  first_name: Yup.string()
    .trim()
    .min(2, "First name is too short")
    .max(50, "First name is too long")
    .required("First name is required"),

  last_name: Yup.string()
    .trim()
    .min(2, "Last name is too short")
    .max(50, "Last name is too long")
    .required("Last name is required"),

  business_name: Yup.string()
    .trim()
    .min(2, "Business name is too short")
    .max(100, "Business name is too long"),
  
  phone_number: Yup.string()
    .trim()
    .matches(/^\d+$/, "Phone number must be digits only")
    .min(7, "Phone number too short")
    .max(15, "Phone number too long"),
    // .required("Phone number is required"),

  country: Yup.string().trim().required("Country is required"),
});


export const changePasswordValidation = Yup.object().shape({
  current_password: Yup.string().required("Current password is required"),

  new_password: Yup.string()
    .test("not-email", "Can't contain your email address", function (value) {
      const { email } = this.parent; // Access the email field
      if (!value || !email) return true; // Skip validation if no value or email
      return !value.includes(email);
    })
    .test("min-chars", "At least 8 characters", (value) => {
      return value ? value.length >= 8 : false;
    })
    .test("number-or-symbol", "Contain a number and symbol", (value) => {
      return value ? /[\d@$!%*?&]/.test(value) : false;
    })
    .test("strength", "Password strength: Weak", (value) => {
      return value ? isStrongPassword(value) : false;
    })
    .required("Password is required"),

  confirm_new_password: Yup.string()
    .oneOf([Yup.ref("new_password"), ""], "Passwords must match")
    .required("Please confirm your new password"),
});
