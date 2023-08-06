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
} from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useState } from 'react'

const data: Payment[] = [
  {
    id: 'm5gr84i9',
    account1: 'saad',
    client: 'apple',
    team_lead: 'waseef',
    customer_success_manager: 'fatimah',
  },
  {
    id: 'm5gr84i9s',
    account1: 'saad',
    client: 'ball',
    team_lead: 'waseef',
    customer_success_manager: 'fatimah',
  },
  {
    id: 'm5gr84i9a',
    account1: 'saad',
    client: 'cat',
    team_lead: 'waseef',
    customer_success_manager: 'fatimah',
  },
  {
    id: 'm5gr84i9d',
    account1: 'saad',
    client: 'dog',
    team_lead: 'waseef',
    customer_success_manager: 'fatimah',
  },
  {
    id: 'm5gr84i93',
    account1: 'saad',
    client: 'egg',
    team_lead: 'waseef',
    customer_success_manager: 'fatimah',
  },
  {
    id: 'm5gr84i95',
    account1: 'saad',
    client: 'fox',
    team_lead: 'waseef',
    customer_success_manager: 'fatimah',
  },
  {
    id: 'm5gr84i97',
    account1: 'saad',
    client: 'grape',
    team_lead: 'waseef',
    customer_success_manager: 'fatimah',
  },
  {
    id: 'm5gr84i99',
    account1: 'saad',
    client: 'horse',
    team_lead: 'waseef',
    customer_success_manager: 'fatimah',
  },
  {
    id: '3u1reuv4',
    account1: 'saad',
    client: 'icecream',
    team_lead: 'waseef',
    customer_success_manager: 'fatimah',
  },
  {
    id: 'derv1ws0',

    account1: 'saad',
    client: 'jman',
    team_lead: 'waseef',
    customer_success_manager: 'fatimah',
  },
  {
    id: '5kma53ae',

    account1: 'saad',
    client: 'kulfi',
    team_lead: 'waseef',
    customer_success_manager: 'fatimah',
  },
  {
    id: 'bhqecj4p',

    account1: 'saad',
    client: 'letter',
    team_lead: 'waseef',
    customer_success_manager: 'fatimah',
  },
]
const data2: Dates[] = [
  {
    id: 'm5gr84i9',
    January: '1',
    February: '2',
    March: '3',
    April: '4',
    May: '5',
    June: '6',
    July: '7',
    August: '8',
    September: '9',
    October: '10',
    November: '11',
    December: '12',
  },
  {
    id: 'm5gr84i9s',
    January: '1',
    February: '2',
    March: '3',
    April: '4',
    May: '5',
    June: '6',
    July: '7',
    August: '8',
    September: '9',
    October: '10',
    November: '11',
    December: '12',
  },
  {
    id: 'm5gr84i9a',
    January: '1',
    February: '2',
    March: '3',
    April: '4',
    May: '5',
    June: '6',
    July: '7',
    August: '8',
    September: '9',
    October: '10',
    November: '11',
    December: '12',
  },
  {
    id: 'm5gr84i9d',
    January: '1',
    February: '2',
    March: '3',
    April: '4',
    May: '5',
    June: '6',
    July: '7',
    August: '8',
    September: '9',
    October: '10',
    November: '11',
    December: '12',
  },
  {
    id: 'm5gr84i93',
    January: '1',
    February: '2',
    March: '3',
    April: '4',
    May: '5',
    June: '6',
    July: '7',
    August: '8',
    September: '9',
    October: '10',
    November: '11',
    December: '12',
  },
  {
    id: 'm5gr84i95',
    January: '1',
    February: '2',
    March: '3',
    April: '4',
    May: '5',
    June: '6',
    July: '7',
    August: '8',
    September: '9',
    October: '10',
    November: '11',
    December: '12',
  },
  {
    id: 'm5gr84i97',
    January: '1',
    February: '2',
    March: '3',
    April: '4',
    May: '5',
    June: '6',
    July: '7',
    August: '8',
    September: '9',
    October: '10',
    November: '11',
    December: '12',
  },
  {
    id: 'm5gr84i99',
    January: '1',
    February: '2',
    March: '3',
    April: '4',
    May: '5',
    June: '6',
    July: '7',
    August: '8',
    September: '9',
    October: '10',
    November: '11',
    December: '12',
  },
  {
    id: '3u1reuv4',
    January: '1',
    February: '2',
    March: '3',
    April: '4',
    May: '5',
    June: '6',
    July: '7',
    August: '8',
    September: '9',
    October: '10',
    November: '11',
    December: '12',
  },
  {
    id: 'derv1ws0',

    January: '1',
    February: '2',
    March: '3',
    April: '4',
    May: '5',
    June: '6',
    July: '7',
    August: '8',
    September: '9',
    October: '10',
    November: '11',
    December: '12',
  },
  {
    id: '5kma53ae',

    January: '1',
    February: '2',
    March: '3',
    April: '4',
    May: '5',
    June: '6',
    July: '7',
    August: '8',
    September: '9',
    October: '10',
    November: '11',
    December: '12',
  },
  {
    id: 'bhqecj4p',

    January: '1',
    February: '2',
    March: '3',
    April: '4',
    May: '5',
    June: '6',
    July: '7',
    August: '8',
    September: '9',
    October: '10',
    November: '11',
    December: '12',
  },
]

export type Payment = {
  id: string
  account1: string
  client: string
  team_lead: string
  customer_success_manager: string
}
export type Dates = {
  id: string
  January: string
  February: string
  March: string
  April: string
  May: string
  June: string
  July: string
  August: string
  September: string
  October: string
  November: string
  December: string
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'account1',
    header: 'Account 1',
    cell: ({ row }) => (
      <div className=' text-center font-medium capitalize '>
        {row.getValue('account1')}
      </div>
    ),
  },
  {
    accessorKey: 'client',
    header: ({ column }) => {
      return (
        <div
          className='flex cursor-pointer items-center justify-center hover:stroke-slate-200'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Client
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </div>
      )
    },
    cell: ({ row }) => (
      <div className=' text-center capitalize '>{row.getValue('client')}</div>
    ),
  },
  {
    accessorKey: 'team_lead',
    header: () => <div className='text-center'>TeamLead</div>,
    cell: ({ row }) => {
      return (
        <div className=' text-center capitalize '>
          {row.getValue('team_lead')}
        </div>
      )
    },
  },
  {
    accessorKey: 'customer_success_manager',
    header: () => <div className='text-center'>Customer Success Manager</div>,
    cell: ({ row }) => {
      return (
        <div className=' text-center capitalize '>
          {row.getValue('customer_success_manager')}
        </div>
      )
    },
  },
]
export const Datescolumns: ColumnDef<Dates>[] = [
  {
    accessorKey: 'January',
    header: 'January',
    cell: ({ row }) => (
      <div className=' text-center capitalize '>{row.getValue('January')}</div>
    ),
  },
  {
    accessorKey: 'February',
    header: 'February',
    cell: ({ row }) => (
      <div className=' text-center capitalize '>{row.getValue('February')}</div>
    ),
  },
  {
    accessorKey: 'March',
    header: 'March',
    cell: ({ row }) => (
      <div className=' text-center capitalize '>{row.getValue('March')}</div>
    ),
  },
  {
    accessorKey: 'April',
    header: 'April',
    cell: ({ row }) => (
      <div className=' text-center capitalize '>{row.getValue('April')}</div>
    ),
  },
  {
    accessorKey: 'May',
    header: 'May',
    cell: ({ row }) => (
      <div className=' text-center capitalize '>{row.getValue('May')}</div>
    ),
  },
  {
    accessorKey: 'June',
    header: 'June',
    cell: ({ row }) => (
      <div className=' text-center capitalize '>{row.getValue('June')}</div>
    ),
  },
  {
    accessorKey: 'July',
    header: 'July',
    cell: ({ row }) => (
      <div className=' text-center capitalize '>{row.getValue('July')}</div>
    ),
  },
  {
    accessorKey: 'August',
    header: 'August',
    cell: ({ row }) => (
      <div className=' text-center capitalize '>{row.getValue('August')}</div>
    ),
  },

  {
    accessorKey: 'September',
    header: () => <div className='text-right'>September</div>,
    cell: ({ row }) => {
      return (
        <div className=' text-center capitalize '>
          {row.getValue('September')}
        </div>
      )
    },
  },
  {
    accessorKey: 'October',
    header: () => <div className='text-right'>October</div>,
    cell: ({ row }) => {
      return (
        <div className=' text-center capitalize '>
          {row.getValue('October')}
        </div>
      )
    },
  },
  {
    accessorKey: 'November',
    header: () => <div className='text-right'>November</div>,
    cell: ({ row }) => {
      return (
        <div className=' text-center capitalize '>
          {row.getValue('November')}
        </div>
      )
    },
  },
  {
    accessorKey: 'December',
    header: () => <div className='text-right'>December</div>,
    cell: ({ row }) => {
      return (
        <div className=' text-center capitalize '>
          {row.getValue('December')}
        </div>
      )
    },
  },
  {
    accessorKey: 'January',
    header: 'January',
    cell: ({ row }) => (
      <div className=' text-center capitalize '>{row.getValue('January')}</div>
    ),
  },
  {
    accessorKey: 'February',
    header: 'February',
    cell: ({ row }) => (
      <div className=' text-center capitalize '>{row.getValue('February')}</div>
    ),
  },
  {
    accessorKey: 'March',
    header: 'March',
    cell: ({ row }) => (
      <div className=' text-center capitalize '>{row.getValue('March')}</div>
    ),
  },
  {
    accessorKey: 'April',
    header: 'April',
    cell: ({ row }) => (
      <div className=' text-center capitalize '>{row.getValue('April')}</div>
    ),
  },
  {
    accessorKey: 'May',
    header: 'May',
    cell: ({ row }) => (
      <div className=' text-center capitalize '>{row.getValue('May')}</div>
    ),
  },
  {
    accessorKey: 'June',
    header: 'June',
    cell: ({ row }) => (
      <div className=' text-center capitalize '>{row.getValue('June')}</div>
    ),
  },
  {
    accessorKey: 'July',
    header: 'July',
    cell: ({ row }) => (
      <div className=' text-center capitalize '>{row.getValue('July')}</div>
    ),
  },
  {
    accessorKey: 'August',
    header: 'August',
    cell: ({ row }) => (
      <div className=' text-center capitalize '>{row.getValue('August')}</div>
    ),
  },
]

export function AvgFirstTimeResponse() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

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
  })
  const DateTable = useReactTable({
    data: data2,
    columns: Datescolumns,

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
  })

  return (
    <div className='flex  py-4'>
      <div className=' w-full rounded-md border'>
        <Table className=' '>
          <TableHeader className='text-center'>
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
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
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
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className=' overflow-auto rounded-md border'>
        <Table className=' '>
          <TableHeader>
            {DateTable.getHeaderGroups().map((headerGroup) => (
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
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {DateTable.getRowModel().rows?.length ? (
              DateTable.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
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
                  colSpan={Datescolumns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
