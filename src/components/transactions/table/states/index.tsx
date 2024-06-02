import { Transaction, TransactionData } from "@/interfaces/transaction";
import { Table, flexRender } from "@tanstack/react-table";
import React from "react";
import { LoadingTable } from "./loading";
import { ErrorTable } from "./error";
import { EmptyTable } from "./no-content";

interface props {
  data: TransactionData | undefined;
  table: Table<Transaction>;
  isLoading: boolean;
  error: any;
}

export const TableState = ({ table, data, isLoading, error }: props) => {
  if (!data && isLoading) {
    return <LoadingTable />;
  }

  if (error) {
    return <ErrorTable error={error} />;
  }

  if (!data) {
    return <EmptyTable />;
  }

  return (
    <div className="min-w-full min-h-fit border border-borderColor overflow-hidden rounded-lg overflow-x-auto overflow-y-auto no-scrollbar">
      <table className="min-w-full max-h-full text-accent table-auto divide-y divide-borderColor text-sm">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="border-y border-borderColor text-start px-6 py-4"
                >
                  <div onClick={header.column.getToggleSortingHandler()}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {{
                      asc: " ↑",
                      desc: " ↓",
                    }[header.column.getIsSorted() as string] ?? null}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-borderColor">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-6 py-4 font-light">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
