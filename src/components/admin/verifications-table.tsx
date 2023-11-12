import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.tsx';
import { VerificationBadge } from '@/components/admin/verification-badge.tsx';
import { AcceptDialog, RejectDialog } from '@/components/admin/manage-verifications-dialog.tsx';
import { useQuery } from '@tanstack/react-query';
import { getUserVerifications } from '@/services/verifications.ts';
import { Loader2 } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from '@/components/ui/pagination.tsx';


export const VerificationsTable = () => {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');
  const { data, isLoading } = useQuery({ queryKey: ['userVerifications', page], queryFn: () => getUserVerifications({ page, take: 9 }) });
  console.log(data);

  return (
    <Table className="w-full">
      <TableCaption>{data && data.count > 0 && <Pagination totalItems={data.count || 0} take={10} />}</TableCaption>
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
          <div className="w-full flex items-center justify-center">
            <Loader2 className="mr-2 h-12 w-12 animate-spin" />
          </div>
        )}
        {data?.userVerifications.map((ver, index) => (
          <TableRow key={index}>
            <TableCell>{ver.User.username}</TableCell>
            <TableCell>{ver.User.lastName === null? ver.User.firstName : ver.User.firstName + " " + ver.User.lastName}</TableCell>
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
      </TableBody>
    </Table>
  );
};
