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

export const formatToTwoDecimalPlaces = (value: string): string => {
  value = value.replace(/[^0-9.]/g, "");

  const parts = value.split(".");

  if (parts.length > 1) {
    parts[1] = parts[1].slice(0, 2);
    value = parts.join(".");
  }

  return value;
};
