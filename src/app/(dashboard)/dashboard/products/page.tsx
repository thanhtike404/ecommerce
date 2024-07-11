'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { MoreHorizontal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent } from '@/components/ui/tabs';

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
} from '@tanstack/react-table';
import { useQuery } from '@tanstack/react-query';

import TabList from '../../Tabs';

const columns = [
  {
    header: 'Name',
    accessorKey: 'name',
  },
  {
    accessorKey: 'imageUrl',
    header: 'Image',
    cell: (info) => (
      <div>
        <Image src={info.getValue()} alt="product" width={50} height={50} />
      </div>
    ),
  },
  {
    header: 'Category',
    accessorKey: 'category.name',
  },
  {
    accessorKey: 'stock',
    header: 'Stock',
    cell: (info) => {
      const stockData = info.getValue();
      return (
        <div className="space-y-2">
          {stockData.map((stock) => (
            <div
              key={stock.id}
              className="flex flex-col p-2 bg-gray-100 rounded-md shadow-md"
            >
              <span className="text-sm font-medium text-gray-700">
                Size: <span className="text-gray-900">{stock.size}</span>
              </span>
              <span className="text-sm font-medium text-gray-700">
                Price: <span className="text-gray-900">{stock.price}</span>
              </span>
              <span className="text-sm font-medium text-gray-700">
                Stock: <span className="text-gray-900">{stock.stock}</span>
              </span>
            </div>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: 'statusId',
    header: 'Status',
    cell: (info: any) => (
      <Badge color="primary">
        {info.getValue() === 1 ? 'Draft' : 'Published'}
      </Badge>
    ),
  },

  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: (info: any) => <span>{formatDate(info.getValue())}</span>,
  },
];

export default function page() {
  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
  });
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await fetch('/api/v1/dashboard/products');
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await res.json();
      return data;
    },
  });

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination, //update the pagination state when internal APIs mutate the pagination state
    state: {
      //...
      pagination,
      columnFilters,
    },
  });

  return (
    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-4">
      <Tabs defaultValue="all">
        <TabList />

        <TabsContent value="all">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Products</CardTitle>
              <CardDescription>
                Manage your products and view their sales performance.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center py-4 justify-between">
                <Input
                  placeholder="Filter Product Name..."
                  value={
                    (table.getColumn('name')?.getFilterValue() as string) ?? ''
                  }
                  onChange={(event) =>
                    table.getColumn('name')?.setFilterValue(event.target.value)
                  }
                  className="max-w-sm"
                />
                <Select
                  defaultValue={table.getState().pagination.pageSize.toString()}
                  onValueChange={(value) => {
                    table.setPageSize(Number(value));
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Page Size" />
                  </SelectTrigger>
                  <SelectContent>
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                      <SelectItem key={pageSize} value={pageSize.toString()}>
                        {pageSize}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Table>
                <TableHeader>
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
                  {table.getRowModel()?.rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="space-x-2">
                <Button
                  onClick={() => table.firstPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  {'<<'}
                </Button>
                <Button
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  {'<'}
                </Button>
                <Button
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  {'>'}
                </Button>
                <Button
                  onClick={() => table.lastPage()}
                  disabled={!table.getCanNextPage()}
                >
                  {'>>'}
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Showing <strong>1-10</strong> of <strong>32</strong> products
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
