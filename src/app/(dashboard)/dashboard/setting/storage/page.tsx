'use client';
import { useState, useEffect } from 'react';

export default function AdminPanel() {
  const [storageProvider, setStorageProvider] = useState('');

  // Fetch current storage provider
  useEffect(() => {
    async function fetchProvider() {
      const res = await fetch('/api/admin/storage-provider');
      const data = await res.json();
      setStorageProvider(data.provider);
    }
    fetchProvider();
  }, []);

  // Handle dropdown change
  const handleChange = async (e) => {
    setStorageProvider(e.target.value);
    await fetch('/api/admin/storage-provider', {
      method: 'POST',
      body: JSON.stringify({ provider: e.target.value }),
      headers: { 'Content-Type': 'application/json' },
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center py-10 px-4">
      <div className="bg-gray-800 rounded-lg shadow-md w-full max-w-md p-6">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-100">
          Admin Panel: Storage Settings
        </h1>
        <p className="text-gray-400 mb-6 text-center">
          Select the storage provider to use for file uploads.
        </p>
        <div className="space-y-4">
          <label
            htmlFor="storage"
            className="block text-sm font-medium text-gray-200"
          >
            Storage Provider
          </label>
          <select
            id="storage"
            value={storageProvider}
            onChange={handleChange}
            className="w-full bg-gray-700 border border-gray-600 text-gray-200 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 p-3"
          >
            <option value="S3">Amazon S3</option>
            <option value="Supabase">Supabase</option>
          </select>
          <div className="text-sm text-gray-400 mt-4">
            <span className="font-medium text-gray-300">Current Provider:</span>{' '}
            {storageProvider || 'Loading...'}
          </div>
        </div>
      </div>
    </div>
  );
}
