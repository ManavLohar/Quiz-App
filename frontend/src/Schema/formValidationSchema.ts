import * as Yup from "yup";

export const formValidationSchema = Yup.object({
  question: Yup.string().required("Please fill up the question field!"),
  options: Yup.array().test(
    "min-filled",
    "Please fill at least two options",
    (arr = []) => arr.filter((v) => v && v.trim() !== "").length >= 2
  ),
  correct_answer: Yup.string().required("Please fill up the answer field!"),
});

export const adminLoginFormSchema = Yup.object({
  email: Yup.string().email().required("Email is required!"),
  password: Yup.string().required("Password is required!"),
});

export const adminSignUpFormSchema = Yup.object({
  name: Yup.string()
    .min(2, "Please type minimum 2 character!")
    .required("Name is required!"),
  email: Yup.string().email().required("Email is required!"),
  password: Yup.string()
    .min(6, "Minimum six character is required!")
    .required("Password is required!"),
});
