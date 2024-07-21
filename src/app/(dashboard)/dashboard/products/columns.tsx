import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';

interface Product {
  name: string;
  imageUrl: string;
  category: { name: string };
  stock: Array<{ id: string; size: string; price: string; stock: string }>;
  statusId: number;
  createdAt: string;
}

const columns: ColumnDef<Product>[] = [
  {
    header: 'Name',
    accessorKey: 'name',
  },
  {
    accessorKey: 'imageUrl',
    header: 'Image',
    cell: (info) => (
      <div>
        <Image
          src={info.getValue() as string}
          alt="product"
          width={50}
          height={50}
        />
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
      const stockData = info.getValue() as Product['stock'];
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
    cell: (info) => (
      <Badge color="primary">
        {info.getValue() === 1 ? 'Draft' : 'Published'}
      </Badge>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: (info) => <span>{formatDate(info.getValue() as string)}</span>,
  },
];

export default columns;
