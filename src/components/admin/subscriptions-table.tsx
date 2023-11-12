import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.tsx';
import { SubscriptionBadge } from '@/components/admin/subscription-badge.tsx';
import { AcceptDialog, RejectDialog } from '@/components/admin/manage-subscriptions-dialog.tsx';
import { SubscriptionsData } from '@/services/subscriptions.ts';
import { Pagination } from '@/components/ui/pagination.tsx';
import { Loader2 } from 'lucide-react';

export const SubscriptionsTable = ({
  data,
  isLoading,
  showPagination,
}: {
  data?: SubscriptionsData;
  isLoading: boolean;
  showPagination?: boolean;
}) => {
  return (
    <Table className="w-full">
      <TableCaption>{data && data.count > 0 && showPagination && <Pagination totalItems={data.count || 0} take={10} />}</TableCaption>
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
          <TableRow>
            <TableCell colSpan={4}>
              <Loader2 className="mx-auto h-12 w-12 animate-spin" />
            </TableCell>
          </TableRow>
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
        {(!data || data.subscriptions.length == 0) && !isLoading && (
          <TableRow>
            <TableCell colSpan={4} className="items-center text-center">
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
