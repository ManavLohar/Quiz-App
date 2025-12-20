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
