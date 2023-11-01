import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button.tsx';
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeft, ChevronsRight } from 'lucide-react';

export const Pagination = ({ totalItems, take }: { totalItems: number; take: number }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultPage = parseInt(searchParams.get('page') || '1');
  const totalPages = Math.ceil(totalItems / take);
  const [page, setPage] = useState<number>(defaultPage <= totalPages ? defaultPage : 1);
  useEffect(() => {
    searchParams.set('page', page.toString());
    setSearchParams(searchParams);
  }, [page]);
  return (
    <div className="flex flex-row justify-end w-full">
      <div className="flex w-[100px] items-center justify-center text-sm font-medium">
        Page {page} of {totalPages}
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="outline" className="hidden h-8 w-8 p-0 lg:flex" onClick={() => setPage(1)} disabled={page <= 1}>
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" className="h-8 w-8 p-0" onClick={() => setPage(page - 1)} disabled={page <= 1}>
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
        <Button variant="outline" className="h-8 w-8 p-0" onClick={() => setPage(page + 1)} disabled={page >= totalPages}>
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
        <Button variant="outline" className="hidden h-8 w-8 p-0 lg:flex" onClick={() => setPage(totalPages)} disabled={page >= totalPages}>
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
