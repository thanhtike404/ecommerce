import DataTable from './OrderTable';
import { Boxes } from 'lucide-react';
import authOptions from '@/authOption';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation'; // Correct import for redirection

export default async function DataTableDemo() {
  const session = await getServerSession(authOptions);

  return (
    <div className="w-4/5 mt-24 mx-auto min-h-96 ">
      <h2>
        <Boxes /> Orders
      </h2>
      <DataTable />
    </div>
  );
}
