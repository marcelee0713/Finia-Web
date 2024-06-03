import { Transaction, csvProps } from "@/interfaces/transaction";
import { json2csv } from "json-2-csv";

export const toCSVString = async ({
  arr,
  onError,
  onLoading,
  onSuccess,
}: csvProps) => {
  if (arr.length === 0) return onError("Transactions are empty");

  try {
    onLoading();

    const csv = json2csv(arr, {
      emptyFieldValue: "",
    });

    onSuccess(csv);
  } catch (err) {
    onError("Something went wrong, file may be not saved or corrupted");
  }
};

export const downloadCSV = (data: string, fileName: string) => {
  const csvData = new Blob([data], { type: "text/csv" });
  const csvURL = URL.createObjectURL(csvData);
  const link = document.createElement("a");
  link.href = csvURL;
  link.download = `${fileName}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
