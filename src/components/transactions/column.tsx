import { Transaction } from "@/interfaces/transaction";
import { formatAmount } from "@/utils/amount_formatter";
import { formatDate } from "@/utils/date_formatter";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<Transaction>();

export const columns = [
  columnHelper.accessor("type", {
    header: () => "Type",
    cell: (info) => info.getValue(),
    enableSorting: false,
  }),
  columnHelper.accessor("amount", {
    header: () => "Amount",
    cell: (info) => formatAmount(info.getValue(), true),
  }),
  columnHelper.accessor("categoryName", {
    header: () => "Category",
    cell: (info) => info.getValue(),
    enableSorting: false,
  }),
  columnHelper.accessor("createdAt", {
    header: () => "Date",
    cell: (info) => formatDate(info.getValue().toString()),
  }),

  columnHelper.accessor("note", {
    header: () => "Note",
    cell: (info) => info.getValue() ?? "",
  }),
];
