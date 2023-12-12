import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import { RxDoubleArrowLeft, RxDoubleArrowRight } from 'react-icons/rx';
import { ArrowUpDown } from 'lucide-react';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import UserDetailsModal from '@/components/modals/UserDetailsModal';
import { defaultImgUrl } from '@/constants/other';
import { Countries } from '@/constants/dropdownData';

interface DataTableProps<TData, TValue> {
  data: TData[];
}

const DataTable = <TData, TValue>({ data }: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<any>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const navigate = useNavigate();

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: 'meeting_country',
      header: 'Country',
      cell: ({ row }) => Countries?.find((el) => el?.value === row?.original?.meeting_country)?.label,
    },
    {
      accessorKey: 'meeting_dateAndTime',
      header: ({ column }) => {
        return (
          <Button className="px-0" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Meeting Date and Time
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: 'notification_title',
      header: ({ column }) => {
        return (
          <Button className="px-0" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Notification Title
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      // accessorKey: "amount",
      header: 'Action',
      cell: ({ row }) => (
        <div className="flex gap-x-2">
          {/* <button
            className="h-4 w-4"
            onClick={() =>
              navigate(`/users/${row.original.uid}`, {
                state: { user: row.original },
              })
            }
          >
            <FaEdit />
          </button>
          <button className="h-4 w-4" onClick={() => console.log(row.original)}>
            <FaTrash />
          </button> */}
          <button
            className="h-4 w-4"
            // onClick={() =>
            //   navigate(`/users/${row.original.uid}`, {
            //     state: { user: row.original, is_view: true },
            //   })
            // }
          >
            <FaEye />
          </button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
  });

  const TablePagination = () => {
    return (
      <div className="flex items-center justify-between mt-4 py-4">
        {/* <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
          </div> */}
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value: any) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent className="dark:bg-boxdark bg-white border-none">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" className="hidden h-8 w-8 p-0 lg:flex" onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
              <span className="sr-only">Go to first page</span>
              <RxDoubleArrowLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="h-8 w-8 p-0" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
              <span className="sr-only">Go to previous page</span>
              <SlArrowLeft className="h-3 w-3" />
            </Button>
            <Button variant="outline" className="h-8 w-8 p-0" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
              <span className="sr-only">Go to next page</span>
              <SlArrowRight className="h-3 w-3" />
            </Button>
            <Button variant="outline" className="hidden h-8 w-8 p-0 lg:flex" onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}>
              <span className="sr-only">Go to last page</span>
              <RxDoubleArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  };

  if (isModalOpen) {
    return <UserDetailsModal isModalOpen={isModalOpen} />;
  }

  return (
    <div className="rounded-sm border border-stroke bg-white text-black dark:text-white px-5 pt-4 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex items-center py-4">
        <Input placeholder="Search here..." value={globalFilter} onChange={(event) => setGlobalFilter(event.target.value)} className="max-w-sm bg-transparent border-stroke " />
      </div>

      <div className="max-w-full overflow-x-auto">
        <Table className="w-full table-auto">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className="bg-gray-2 text-left dark:bg-meta-4" key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return <TableHead key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>;
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination />
      </div>
    </div>
  );
};
export default DataTable;
