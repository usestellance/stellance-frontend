/* eslint-disable react-hooks/incompatible-library */
"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { invoiceRoutes } from "../../../config/constants/routes";
import { useRouter } from "next/navigation";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const router = useRouter();

  return (
    <div className="overflow-hidden">
      <Table>
        <TableHeader className="">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="">
          {!table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                className="hover:bg-primary-500 hover:text-neutral-500 border-t-10 border-neutral-500 cursor-pointer"
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                onClick={() =>
                  router.push(invoiceRoutes.PREVIEW_INVOICE(row.id || ""))
                }
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell className="" key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow className="border-t-10 border-neutral-500">
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center p-10"
              >
                <p className="text-lg">
                  You have not created any invoice yet. <br /> All latest
                  invoices would be displayed here.
                </p>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
