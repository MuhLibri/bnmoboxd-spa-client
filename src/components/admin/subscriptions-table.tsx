import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.tsx';
import { SubscriptionBadge } from '@/components/admin/subscription-badge.tsx';
import { AcceptDialog, RejectDialog } from '@/components/admin/manage-subscriptions-dialog.tsx';
import { useQuery } from '@tanstack/react-query';
import { getSubscriptions } from '@/services/subscriptions.ts';
import { Loader2 } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from '@/components/ui/pagination.tsx';

export const SubscriptionsTable = () => {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');
  const { data, isLoading } = useQuery({ queryKey: ['subscriptions', page], queryFn: () => getSubscriptions({ page, take: 9 }) });

  return (
    <Table className="w-full">
      <TableCaption>{data && data.count > 0 && <Pagination totalItems={data.count || 0} take={10} />}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Curator</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading && (
          <div className="w-full flex items-center justify-center">
            <Loader2 className="mr-2 h-12 w-12 animate-spin" />
          </div>
        )}
        {data?.subscriptions.map((sub, index) => (
          <TableRow key={index}>
            <TableCell>{sub.subscriberUsername}</TableCell>
            <TableCell>{sub.curatorUsername}</TableCell>
            <TableCell>
              <SubscriptionBadge status={sub.status} />
            </TableCell>
            <TableCell>
              <div className="flex flex-row items-center space-x-4">
                <AcceptDialog subscription={sub} />
                <RejectDialog subscription={sub} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
