import React, { Dispatch, useEffect } from "react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import { columns } from "../column";
import { Transaction } from "@/interfaces/transaction";
import { Filter } from "../filters/filter";
import { SortOrder } from "@/types/transaction";

interface props {
  data: Transaction[];
  allDataLength: number;
  onPaginate: (skipValue: number, takeValue: number) => void;
  onSort: (
    onAmountSort: SortOrder,
    onDateOrder: SortOrder,
    onNoteOrder: SortOrder
  ) => void;
  pagination: PaginationState;
  setPagination: Dispatch<React.SetStateAction<PaginationState>>;
  sorting: SortingState;
  setSorting: Dispatch<React.SetStateAction<SortingState>>;
}

export const Table = ({
  data,
  allDataLength,
  onPaginate,
  pagination,
  setPagination,
  onSort,
  sorting,
  setSorting,
}: props) => {
  const table = useReactTable({
    data,
    columns: columns,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    rowCount: allDataLength, // Put the full length of the user's transactions
    state: {
      pagination,
      sorting,
    },
    onSortingChange: setSorting,
    isMultiSortEvent: () => true,
    onPaginationChange: setPagination,
    manualPagination: true,
    getSortedRowModel: getSortedRowModel(),
  });

  useEffect(() => {
    const skip = pagination.pageIndex * pagination.pageSize;
    const take = pagination.pageSize;

    onPaginate(skip, take);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination]);

  useEffect(() => {
    let amountOrder: SortOrder;
    let dateOrder: SortOrder;
    let noteOrder: SortOrder;

    sorting.forEach((val) => {
      if (val.id === "amount") {
        amountOrder = val.desc ? "desc" : "asc";
      } else if (val.id === "createdAt") {
        dateOrder = val.desc ? "desc" : "asc";
      } else if (val.id === "note") {
        noteOrder = val.desc ? "desc" : "asc";
      }
    });

    onSort(amountOrder, dateOrder, noteOrder);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorting]);

  return (
    <div className="flex-1 flex flex-col gap-2">
      <div className="min-w-full min-h-fit border border-borderColor overflow-hidden rounded-lg  overflow-x-auto overflow-y-auto no-scrollbar">
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
      <div className="flex items-center justify-between gap-2 text-accent text-sm font-light h-[35px]">
        <div className="h-full flex items-center justify-center">
          Showing {table.getRowModel().rows.length.toLocaleString()} of{" "}
          {allDataLength.toLocaleString()} Rows
        </div>

        <div className="flex items-center gap-10 h-full">
          <div className="flex items-center h-full gap-2">
            <div className="font-bold">Rows per page</div>
            <Filter
              element={table.getState().pagination.pageSize.toString()}
              filterArr={["10", "20", "30", "40", "50"]}
              onPress={(e) => {
                table.setPageSize(Number(e));
              }}
            />
          </div>

          <span className="flex items-center gap-1">
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount().toLocaleString()}
            </strong>
          </span>

          <div className="flex items-center gap-1 h-full text-base">
            <button
              className="border border-borderColor rounded p-1 w-auto px-2 disabled:text-opacity-10 disabled:border-borderColorDisabled"
              onClick={() => table.firstPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {"<<"}
            </button>
            <button
              className="border border-borderColor rounded p-1 w-auto px-2 disabled:text-opacity-10 disabled:border-borderColorDisabled"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {"<"}
            </button>
            <button
              className="border border-borderColor rounded p-1 w-auto px-2 disabled:text-opacity-10 disabled:border-borderColorDisabled"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              {">"}
            </button>
            <button
              className="border border-borderColor rounded p-1 w-auto px-2 disabled:text-opacity-10 disabled:border-borderColorDisabled"
              onClick={() => table.lastPage()}
              disabled={!table.getCanNextPage()}
            >
              {">>"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
