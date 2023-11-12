import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.tsx';
import { VerificationBadge } from '@/components/admin/verification-badge.tsx';
import { AcceptDialog, RejectDialog } from '@/components/admin/manage-verifications-dialog.tsx';
import { UserVerificationData } from '@/services/verifications.ts';
import { Loader2 } from 'lucide-react';
import { Pagination } from '@/components/ui/pagination.tsx';

export const VerificationsTable = ({
  data,
  isLoading,
  showPagination,
}: {
  data?: UserVerificationData;
  isLoading: boolean;
  showPagination?: boolean;
}) => {
  return (
    <Table className="w-full">
      <TableCaption>{data && data.count > 0 && showPagination && <Pagination totalItems={data.count || 0} take={10} />}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Username</TableHead>
          <TableHead>Full Name</TableHead>
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
        {data?.userVerifications.map((ver, index) => (
          <TableRow key={index}>
            <TableCell>{ver.User.username}</TableCell>
            <TableCell>{ver.User.lastName === null ? ver.User.firstName : ver.User.firstName + ' ' + ver.User.lastName}</TableCell>
            <TableCell>
              <VerificationBadge status={ver.status} />
            </TableCell>
            <TableCell>
              <div className="flex flex-row items-center space-x-4">
                <AcceptDialog userVerification={ver} />
                <RejectDialog userVerification={ver} />
              </div>
            </TableCell>
          </TableRow>
        ))}
        {(!data || data.userVerifications.length == 0) && !isLoading && (
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
