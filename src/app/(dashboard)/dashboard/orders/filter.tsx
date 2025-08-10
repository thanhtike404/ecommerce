import DebouncedInput from './debounceInput';
import { orderStatuses } from './columns';
import { Column } from '@tanstack/react-table';
import { CalendarForm } from '@/components/DateRange';
export default function Filter({ column }: { column: Column<any, unknown> }) {
  const columnFilterValue = column.getFilterValue();
  const { filterVariant }: any = column.columnDef.meta ?? {};

  return filterVariant === 'range' ? (
    <div>
      <CalendarForm />
    </div>
  ) : filterVariant === 'select' ? (
    <select
      onChange={(e) => column.setFilterValue(e.target.value)}
      value={columnFilterValue?.toString()}
      className="px-4 py-2"
    >
      <option value="">All</option>

      {Object.values(orderStatuses).map((status: any) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </select>
  ) : (
    <DebouncedInput
      className="w-36 py-1 px-4 border shadow rounded"
      onChange={(value) => column.setFilterValue(value)}
      placeholder={`Search...`}
      type="text"
      value={(columnFilterValue ?? '') as string}
    />
  );
}
