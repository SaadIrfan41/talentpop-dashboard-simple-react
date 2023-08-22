import * as React from 'react'
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

const data: Payment[] = [
  {
    id: 'm5gr84i9',
    agent_name: 'saad',
    client: 'apple',
  },
  {
    id: 'm5gr84i9s',
    agent_name: 'saad',
    client: 'ball',
  },
  {
    id: 'm5gr84i9a',
    agent_name: 'saad',
    client: 'cat',
  },
  {
    id: 'm5gr84i9d',
    agent_name: 'saad',
    client: 'dog',
  },
  {
    id: 'm5gr84i93',
    agent_name: 'saad',
    client: 'egg',
  },
  {
    id: 'm5gr84i95',
    agent_name: 'saad',
    client: 'fox',
  },
  {
    id: 'm5gr84i97',
    agent_name: 'saad',
    client: 'grape',
  },
  {
    id: 'm5gr84i99',
    agent_name: 'saad',
    client: 'horse',
  },
  {
    id: '3u1reuv4',
    agent_name: 'saad',
    client: 'icecream',
  },
  {
    id: 'derv1ws0',

    agent_name: 'saad',
    client: 'jman',
  },
  {
    id: '5kma53ae',

    agent_name: 'saad',
    client: 'kulfi',
  },
  {
    id: 'bhqecj4p',

    agent_name: 'saad',
    client: 'letter',
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
  agent_name: string
  client: string
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

const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'agent_name',
    header: 'Agent Name',
    cell: ({ row }: any) => (
      <div className=' text-center font-medium capitalize '>
        {row.getValue('agent_name')}
      </div>
    ),
  },
  {
    accessorKey: 'client',
    header: ({ column }: any) => {
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
    cell: ({ row }: any) => (
      <div className=' text-center capitalize '>{row.getValue('client')}</div>
    ),
  },
]
export const Datescolumns: ColumnDef<Dates>[] = [
  {
    accessorKey: 'January',
    header: 'January',
    cell: ({ row }: any) => (
      <div className=' text-center capitalize '>{row.getValue('January')}</div>
    ),
  },
  {
    accessorKey: 'February',
    header: 'February',
    cell: ({ row }: any) => (
      <div className=' text-center capitalize '>{row.getValue('February')}</div>
    ),
  },
  {
    accessorKey: 'March',
    header: 'March',
    cell: ({ row }: any) => (
      <div className=' text-center capitalize '>{row.getValue('March')}</div>
    ),
  },
  {
    accessorKey: 'April',
    header: 'April',
    cell: ({ row }: any) => (
      <div className=' text-center capitalize '>{row.getValue('April')}</div>
    ),
  },
  {
    accessorKey: 'May',
    header: 'May',
    cell: ({ row }: any) => (
      <div className=' text-center capitalize '>{row.getValue('May')}</div>
    ),
  },
  {
    accessorKey: 'June',
    header: 'June',
    cell: ({ row }: any) => (
      <div className=' text-center capitalize '>{row.getValue('June')}</div>
    ),
  },
  {
    accessorKey: 'July',
    header: 'July',
    cell: ({ row }: any) => (
      <div className=' text-center capitalize '>{row.getValue('July')}</div>
    ),
  },
  {
    accessorKey: 'August',
    header: 'August',
    cell: ({ row }: any) => (
      <div className=' text-center capitalize '>{row.getValue('August')}</div>
    ),
  },

  {
    accessorKey: 'September',
    header: () => <div className='text-right'>September</div>,
    cell: ({ row }: any) => {
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
    cell: ({ row }: any) => {
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
    cell: ({ row }: any) => {
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
    cell: ({ row }: any) => {
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
    cell: ({ row }: any) => (
      <div className=' text-center capitalize '>{row.getValue('January')}</div>
    ),
  },
  {
    accessorKey: 'February',
    header: 'February',
    cell: ({ row }: any) => (
      <div className=' text-center capitalize '>{row.getValue('February')}</div>
    ),
  },
  {
    accessorKey: 'March',
    header: 'March',
    cell: ({ row }: any) => (
      <div className=' text-center capitalize '>{row.getValue('March')}</div>
    ),
  },
  {
    accessorKey: 'April',
    header: 'April',
    cell: ({ row }: any) => (
      <div className=' text-center capitalize '>{row.getValue('April')}</div>
    ),
  },
  {
    accessorKey: 'May',
    header: 'May',
    cell: ({ row }: any) => (
      <div className=' text-center capitalize '>{row.getValue('May')}</div>
    ),
  },
  {
    accessorKey: 'June',
    header: 'June',
    cell: ({ row }: any) => (
      <div className=' text-center capitalize '>{row.getValue('June')}</div>
    ),
  },
  {
    accessorKey: 'July',
    header: 'July',
    cell: ({ row }: any) => (
      <div className=' text-center capitalize '>{row.getValue('July')}</div>
    ),
  },
  {
    accessorKey: 'August',
    header: 'August',
    cell: ({ row }: any) => (
      <div className=' text-center capitalize '>{row.getValue('August')}</div>
    ),
  },
]

export function AvgCSATScore() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

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
      <div className=' w-1/2 rounded-md border'>
        <Table className=' '>
          <TableHeader className='text-center'>
            {table.getHeaderGroups().map((headerGroup: any) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header: any) => {
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