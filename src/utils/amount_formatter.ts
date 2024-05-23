export const formatAmount = (input: string, withCurrency: boolean): string => {
  const number = parseFloat(input);
  if (isNaN(number)) {
    throw new Error("Invalid number format");
  }

  const formattedNumber = number.toFixed(2);

  const parts = formattedNumber.split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const result = withCurrency ? `PHP ${parts.join(".")}` : parts.join(".");

  return result;
};
