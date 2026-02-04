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
  const fullDate = new Intl.DateTimeFormat("en-In", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
  return fullDate;
};
