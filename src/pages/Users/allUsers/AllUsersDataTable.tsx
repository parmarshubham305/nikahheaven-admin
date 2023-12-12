import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import { RxDoubleArrowLeft, RxDoubleArrowRight } from 'react-icons/rx';
import { ArrowUpDown } from 'lucide-react';
import { FaEdit, FaEye, FaSpinner } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { defaultImgUrl } from '@/constants/other';
import TableTitle from '@/components/TableTitle';
import DeleteUser from '../../../components/modals/DeleteUserModal';
import useFirebaseSetDoc from '@/firebase/hooks/useFirebaseSetData';
import { C_USERS } from '@/firebase/constants';

interface allUsersDataTableProps {
  data: [];
}

const AllUsersDataTable: React.FC<allUsersDataTableProps> = ({ data }) => {
  const [sorting, setSorting] = useState<any>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>('');
  const { loading, setDocData } = useFirebaseSetDoc();

  const navigate = useNavigate();
  const handleDelete = async (row: any) => {
    const UpdatedPayload = { ...row.original, status: 'Delete' };
    const response = await setDocData(UpdatedPayload, C_USERS, row.original.uid);
    return response;
  };

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: 'profilePic',
      header: 'Photo',
      cell: ({ row }) => <img src={row.original.profilePic ? row.original.profilePic : defaultImgUrl} className="w-9 h-9 rounded-full" alt="profilePic" />,
    },
    {
      accessorKey: 'name',
      header: ({ column }) => {
        return (
          <Button className="px-0" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: 'email',
      header: ({ column }) => {
        return (
          <Button className="px-0" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: 'role',
      header: ({ column }) => {
        return (
          <Button className="px-0" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Role
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      // accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <span className={`text-xs font-medium me-2 px-2.5 py-0.5 rounded-full text-white ${row.original.status === 'Active' ? 'bg-success' : 'bg-danger'} `}>
          {row.original.status}
        </span>
      ),
    },
    {
      // accessorKey: "amount",
      header: 'Action',
      cell: ({ row }) => (
        <div className="flex gap-x-2">
          <button
            className="h-4 w-4"
            onClick={() =>
              navigate(`/users/${row.original.uid}`, {
                state: { user: row.original },
              })
            }
          >
            <FaEdit />
          </button>
          <DeleteUser row={row} handleDelete={handleDelete} loading={loading} />
          <button
            className="h-4 w-4"
            onClick={() =>
              navigate(`/users/${row.original.uid}`, {
                state: { user: row.original, is_view: true },
              })
            }
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

  return (
    <div className="rounded-sm border border-stroke bg-white text-black dark:text-white px-5 pt-4 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <TableTitle globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} tableName="All Users" />
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
export default AllUsersDataTable;
