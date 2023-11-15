import { TypographyH2 } from '@/components/ui/typography.tsx';
import { VerificationsTable } from '@/components/admin/verifications-table.tsx';
import { AdminLayout } from '@/components/layout/admin-layout.tsx';
import { useQuery } from '@tanstack/react-query';
import { getUserVerifications } from '@/services/verifications.ts';
import { useSearchParams } from 'react-router-dom';

export const VerificationPage = () => {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');
  const take = 10;
  const { data, isLoading } = useQuery({ queryKey: ['userVerifications', page, take], queryFn: () => getUserVerifications({ page, take }) });
  return (
    <AdminLayout>
      <TypographyH2 text="Curator Verifications" />
      <VerificationsTable data={data} isLoading={isLoading} showPagination={true} />
    </AdminLayout>
  );
};
