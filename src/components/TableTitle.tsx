import React from 'react';
import { Input } from './ui/input';

interface tableTitleProps {
  globalFilter: string;
  setGlobalFilter: any;
  tableName: string;
}

const TableTitle: React.FC<tableTitleProps> = ({ globalFilter, setGlobalFilter, tableName }) => {
  return (
    <div className="flex-col sm:flex-row gap-2 sm:gap-0 flex items-center justify-between py-4">
      <h1 className="text-2xl font-bold">{tableName}</h1>
      <Input placeholder="Search here..." value={globalFilter} onChange={(event) => setGlobalFilter(event.target.value)} className="max-w-sm bg-transparent border-stroke " />
    </div>
  );
};

export default TableTitle;
