import React from 'react';
import { ColumnDef, FilterFn } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowUpDown } from 'lucide-react';
import Image from 'next/image';
import { Calendar } from '@/components/ui/calendar';
import { Order } from './type';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
const filterByProductName: FilterFn<Order> = (row, columnId, filterValue) => {
  const orderItem = row.original.orderItems[0];
  return (
    orderItem?.productName?.toLowerCase().includes(filterValue.toLowerCase()) ??
    false
  );
};

export const orderStatuses = {
  pending: 'Pending',
  processing: 'Processing',
  shipped: 'Shipped',
  delivered: 'Delivered',
  canceled: 'Canceled',
  returned: 'Returned',
};

interface ColumnsComponentProps {
  handleOrderChange: (id: string, role: string) => void;
}
const filterByDate: FilterFn<Order> = (row, columnId, filterValue) => {
  const rowDate = new Date(row.getValue(columnId)).setHours(0, 0, 0, 0);
  const filterDate = filterValue?.setHours(0, 0, 0, 0);
  return rowDate === filterDate;
};

export const ColumnsComponent: React.FC<ColumnsComponentProps> = ({
  handleOrderChange,
}) => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    undefined
  );
  const columns: ColumnDef<Order>[] = [
    {
      id: 'select',

      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) =>
            console.log(table.toggleAllPageRowsSelected(!!value))
          }
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <div className="text-center">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'id',
      enableColumnFilter: false,
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          OrderId
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-center">{row.getValue('id')}</div>
      ),
    },

    {
      accessorKey: 'productImage',
      enableColumnFilter: false, // Unique accessor key
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Product Image
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const orderItem = row.original.orderItems[0];
        return (
          <div className="text-center">
            <Image
              className="ml-4"
              src={
                orderItem?.productImage ??
                'https://lh3.googleusercontent.com/a/ACg8ocIKcrZbD1DmQY_G4DCsve1RNQIYZAPojPXm0MrGVE1MAu2RiRBu=s96-c'
              }
              alt={orderItem?.productName}
              height={30}
              width={30}
            />
          </div>
        );
      },
    },
    {
      accessorKey: 'productName', // Unique accessor key
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Product Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const orderItem = row.original.orderItems[0];
        return <div className="text-center">{orderItem?.productName}</div>;
      },
      filterFn: filterByProductName, // Use the custom filter function here
    },
    {
      accessorKey: 'quantity', // Unique accessor key
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Order Quantity
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const orderItem = row.original.orderItems[0];
        return <div className="text-center">{orderItem?.quantity}</div>;
      },
    },
    {
      accessorKey: 'price', // Unique accessor key
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const orderItem = row.original.orderItems[0];
        return <div className="text-center">{orderItem?.price}</div>;
      },
    },
    {
      accessorKey: 'totalAmount',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Total Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-center">{row.getValue('totalAmount')}</div>
      ),
    },
    {
      accessorKey: 'paymentMethod',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Payment Method
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-center">{row.getValue('paymentMethod')}</div>
      ),
    },
    {
      accessorKey: 'orderStatus',
      meta: {
        filterVariant: 'select',
      }, // Unique accessor key
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Order Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const currentStatus = row.getValue('orderStatus');

        return (
          <div className="text-center">
            <Badge
              variant={
                orderStatuses[currentStatus] !== 'pending'
                  ? 'secondary'
                  : 'destructive'
              }
            >
              {orderStatuses[currentStatus]}
            </Badge>
          </div>
        );
      },
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant={'outline'}>
              {selectedDate
                ? selectedDate.toLocaleDateString('en-US')
                : 'Select Date'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => {
                setSelectedDate(date);
                column.setFilterValue(date); // Update the filter value with the selected date
              }}
              disabled={(date) =>
                date > new Date() || date < new Date('1900-01-01')
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
      ),
      cell: ({ row }) => (
        <div className="text-center">
          {new Date(row.getValue('createdAt')).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </div>
      ),
      filterFn: filterByDate, // Use the custom filter function here
      enableColumnFilter: true, // Enable column filtering
    },
  ];

  return { columns };
};
