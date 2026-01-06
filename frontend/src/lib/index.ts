export const getErrorMessage = (error: any): string => {
  if ("data" in error) {
    return error.data?.message || "Something went wrong!";
  } else if (typeof error === "string") {
    return error || "Something went wrong!";
  }
  return error.message || "Something went wrong!";
};

export const extractDate = (value: string): string => {
  const date = new Date(value);
  const fullDate = date.toLocaleDateString("en-GB");
  return fullDate;
};
