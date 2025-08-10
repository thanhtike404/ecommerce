'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBannerStatus, deleteBanner } from './action';
import { useRouter } from 'next/navigation';

interface StatusSelectorProps {
  bannerId: number;
  currentStatus: string;
}

export default function StatusSelector({
  bannerId,
  currentStatus,
}: StatusSelectorProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  // Mutation to update banner status
  const { mutate: updateStatus, isPending: isUpdating } = useMutation({
    mutationFn: async (newStatus: string) => {
      return await updateBannerStatus(bannerId, newStatus);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['banners', bannerId] });
      router.refresh();
    },
    onError: (error) => {
      console.error('Error updating status:', error);
    },
  });

  // Mutation to delete a banner
  const { mutate: deleteItem, isPending: isDeleting } = useMutation({
    mutationFn: async () => {
      return await deleteBanner(bannerId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['banners', bannerId] });
      router.refresh();
    },
    onError: (error) => {
      console.error('Error deleting banner:', error);
    },
  });

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    updateStatus(newStatus);
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this banner?')) {
      deleteItem();
    }
  };

  return (
    <div className="relative inline-flex items-center space-x-4">
      <div className="relative inline-block">
        <select
          value={currentStatus}
          onChange={handleStatusChange}
          disabled={isUpdating || isDeleting}
          className={`px-2 py-1 rounded bg-gray-900 text-white ${
            isUpdating ? 'opacity-50' : ''
          }`}
        >
          <option value="ACTIVE">ACTIVE</option>
          <option value="INACTIVE">INACTIVE</option>
        </select>
        {isUpdating && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 rounded">
            <span className="text-sm text-white">Updating...</span>
          </div>
        )}
      </div>

      {/* Delete Button */}
      <button
        onClick={handleDelete}
        disabled={isDeleting || isUpdating}
        className={`px-3 py-1 rounded text-white font-medium ${
          isDeleting ? 'bg-red-400 opacity-75' : 'bg-red-600 hover:bg-red-700'
        }`}
      >
        {isDeleting ? 'Deleting...' : 'Delete'}
      </button>
    </div>
  );
}
