import { useState } from 'react'; // Import useState hook
import { ColumnDef } from '@tanstack/react-table';
import { useToast } from '@/components/ui/use-toast';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import useCategoryStore from '@/store/dashboard/categoryStore';
import { formatDate } from './categoryTableUtils';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react';
interface Category {
  id: string;
  name: string;
  iconUrl: string;
  createdAt: string;
  updatedAt: string;
}

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: 'id',
    header: 'Id',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'iconUrl',
    header: 'Icon',
    cell: ({ row }): JSX.Element => {
      const [loading, setLoading] = useState(true); // Initialize loading state

      const handleImageLoad = () => {
        setLoading(false); // Set loading to false when the image is fully loaded
      };

      return (
        <div className="relative">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center">
              Loading...
            </div>
          )}
          <Image
            width={50}
            height={50}
            src={row.getValue('iconUrl')}
            alt={row.getValue('name')}
            onLoad={handleImageLoad}
          />
        </div>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => formatDate(row.getValue('createdAt')),
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated At',
    cell: ({ row }) => formatDate(row.getValue('updatedAt')),
  },

  {
    header: 'Actions',
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const { toast } = useToast();
      const queryClient = useQueryClient();
      const setSelectedCategory = useCategoryStore(
        (state) => state.setSelectedCategory
      );
      const mutation = useMutation({
        mutationFn: async (id: string) =>
          await axios.delete(`/api/v1/dashboard/categories/${id}`),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['categories'] });
          toast({
            title: 'Success',
            description: 'Category deleted successfully',
          });
        },
      });

      const handleDelete = () => {
        mutation.mutate(row.original.id);
      };

      const handleEdit = () => {
        setSelectedCategory(row.original);
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
