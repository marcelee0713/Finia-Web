import { Transaction, TransactionData } from "@/interfaces/transaction";
import { formatAmount } from "@/utils/amount_formatter";
import { formatDate } from "@/utils/date_formatter";
import { createColumnHelper } from "@tanstack/react-table";
import { CellActionButton } from "./modal/action";
import { KeyedMutator } from "swr";

const columnHelper = createColumnHelper<Transaction>();

interface props {
  revalidate: KeyedMutator<TransactionData>;
  data: TransactionData | undefined;
}

export const columns = ({ revalidate, data }: props) => {
  return [
    columnHelper.accessor("type", {
      header: () => "Type",
      cell: (info) => info.getValue(),
      enableSorting: false,
    }),
    columnHelper.accessor("amount", {
      header: () => "Amount",
      cell: (info) => formatAmount(info.getValue().toString(), true),
    }),
    columnHelper.accessor("categoryName", {
      header: () => "Category",
      cell: (info) => info.getValue(),
      enableSorting: false,
    }),
    columnHelper.accessor("createdAt", {
      header: () => "Date",
      cell: (info) => formatDate(info.getValue().toString()),
      sortDescFirst: true,
    }),
    columnHelper.accessor("note", {
      header: () => "Note",
      cell: (info) => info.getValue() ?? "",
      sortUndefined: "last",
    }),
    columnHelper.display({
      id: "actions",
      cell: ({ cell }) => (
        <CellActionButton
          obj={cell.row.original}
          data={data}
          revalidate={revalidate}
        />
      ),
    }),
  ];
};
