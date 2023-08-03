"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const data: Payment[] = [
  {
    id: "m5gr84i9",
    agent_name: "saad",
    client: "apple",
    account_1: "waseef",

    avg_first_response_time: 25.56,
  },
  {
    id: "m5gr84i9s",
    agent_name: "saad",
    client: "ball",
    account_1: "waseef",

    avg_first_response_time: 25.56,
  },
  {
    id: "m5gr84i9a",
    agent_name: "saad",
    client: "cat",
    account_1: "waseef",

    avg_first_response_time: 25.56,
  },
  {
    id: "m5gr84i9d",
    agent_name: "saad",
    client: "dog",
    account_1: "waseef",

    avg_first_response_time: 25.56,
  },
  {
    id: "m5gr84i93",
    agent_name: "saad",
    client: "egg",
    account_1: "waseef",

    avg_first_response_time: 25.56,
  },
  {
    id: "m5gr84i95",
    agent_name: "saad",
    client: "fox",
    account_1: "waseef",

    avg_first_response_time: 25.56,
  },
  {
    id: "m5gr84i97",
    agent_name: "saad",
    client: "grape",
    account_1: "waseef",

    avg_first_response_time: 25.56,
  },
  {
    id: "m5gr84i99",
    agent_name: "saad",
    client: "horse",
    account_1: "waseef",

    avg_first_response_time: 25.56,
  },
  {
    id: "3u1reuv4",
    agent_name: "saad",
    client: "icecream",
    account_1: "waseef",

    avg_first_response_time: 25.56,
  },
  {
    id: "derv1ws0",

    agent_name: "saad",
    client: "jman",
    account_1: "waseef",

    avg_first_response_time: 25.56,
  },
  {
    id: "5kma53ae",

    agent_name: "saad",
    client: "kulfi",
    account_1: "waseef",

    avg_first_response_time: 25.56,
  },
  {
    id: "bhqecj4p",

    agent_name: "saad",
    client: "letter",
    account_1: "waseef",

    avg_first_response_time: 25.56,
  },
];

export type Payment = {
  id: string;
  agent_name: string;
  client: string;
  account_1: string;
  avg_first_response_time: number;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "agent_name",
    header: "Agent Name",
    cell: ({ row }) => (
      <div className=" text-center font-medium capitalize ">
        {row.getValue("agent_name")}
      </div>
    ),
  },
  {
    accessorKey: "client",
    header: ({ column }) => {
      return (
        <div
          className="flex cursor-pointer items-center justify-center hover:stroke-slate-200"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Client
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => (
      <div className=" text-center capitalize ">{row.getValue("client")}</div>
    ),
  },
  {
    accessorKey: "account_1",
    header: () => <div className="text-center">Account 1</div>,
    cell: ({ row }) => {
      return (
        <div className=" text-center capitalize ">
          {row.getValue("account_1")}
        </div>
      );
    },
  },

  {
    accessorKey: "avg_first_response_time",
    header: () => <div className="text-right">Avg First Response Time</div>,
    cell: ({ row }) => {
      const amount = parseFloat(
        row.getValue("avg_first_response_time")
      ).toFixed(2);

      return <div className="text-center font-medium">{amount}</div>;
    },
  },
];

export function RollingAvgFirstResponseTimeByClient() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,

    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="flex  py-4">
      <div className=" w-full rounded-md border">
        <Table className=" ">
          <TableHeader className="text-center">
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
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
