import DataTable from './DataTable';
import { Boxes } from 'lucide-react';
export default function DataTableDemo() {
  return (
    <div className="w-4/5 mt-24 mx-auto min-h-96 ">
      <h2>
        <Boxes /> Orders
      </h2>
      <DataTable />
    </div>
  );
}
