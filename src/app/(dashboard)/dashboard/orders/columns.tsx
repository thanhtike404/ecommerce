import React from 'react';
import { ColumnDef, FilterFn } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowUpDown } from 'lucide-react';
import Image from 'next/image';
import { Order } from './type';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const filterByProductName: FilterFn<Order> = (row, columnId, filterValue) => {
  const orderItem = row.original.orderItems[0];
  return (
    orderItem?.productName?.toLowerCase().includes(filterValue.toLowerCase()) ??
    false
  );
};

const orderStatuses = {
  pending: 'Pending',
  processing: 'Processing',
  shipped: 'Shipped',
  delivered: 'Delivered',
  canceled: 'Canceled',
  returned: 'Returned',
};

export const columns: ColumnDef<Order>[] = [
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
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        OrderId
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue('id')}</div>,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Email
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <h3 className="text-center">{row.getValue('email')}</h3>,
  },
  {
    accessorKey: 'userImage',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Image
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <Image
        alt={row.getValue('email')}
        height={30}
        width={30}
        className="mx-auto rounded-lg"
        src={row.getValue('userImage')}
      />
    ),
  },

  {
    accessorKey: 'productImage', // Unique accessor key
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Image
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
    accessorKey: 'orderStatus', // Unique accessor key
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
          <select defaultValue={currentStatus}>
            {Object.keys(orderStatuses).map((status) => (
              <option key={status} value={status}>
                {orderStatuses[status]}
              </option>
            ))}
          </select>
        </div>
      );
    },
  },
];
