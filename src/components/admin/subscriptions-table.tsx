import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.tsx';
import { SubscriptionBadge } from '@/components/admin/subscription-badge.tsx';
import { AcceptDialog, RejectDialog } from '@/components/admin/manage-subscriptions-dialog.tsx';

export const SubscriptionsTable = () => {
  const subscriptions = [
    {
      curatorUsername: 'curator1',
      subscriberUsername: 'subscriber2',
      status: 'PENDING',
    },
    {
      curatorUsername: 'curator1',
      subscriberUsername: 'subscriber1',
      status: 'ACCEPTED',
    },
    {
      curatorUsername: 'curator1',
      subscriberUsername: 'subscriber3',
      status: 'REJECTED',
    },
    {
      curatorUsername: 'curator1',
      subscriberUsername: 'subscriber4',
      status: 'PENDING',
    },
  ];

  return (
    <Table className="w-full">
      <TableCaption>Page 1 of 100</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Curator</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {subscriptions.map((sub, index) => (
          <TableRow key={index}>
            <TableCell>{sub.subscriberUsername}</TableCell>
            <TableCell>{sub.curatorUsername}</TableCell>
            <TableCell>
              <SubscriptionBadge status={sub.status} />
            </TableCell>
            <TableCell>
              <div className="flex flex-row items-center space-x-4">
                <AcceptDialog />
                <RejectDialog />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
