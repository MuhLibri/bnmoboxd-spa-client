import { TypographyH2 } from '@/components/ui/typography.tsx';
import { AdminLayout } from '@/components/layout/admin-layout.tsx';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getSubscriptions } from '@/services/subscriptions.ts';
import { SubscriptionsTable } from '@/components/admin/subscriptions-table.tsx';

export const SubscriptionPage = () => {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');
  const take = 10;
  const { data, isLoading } = useQuery({ queryKey: ['subscriptions', page, take], queryFn: () => getSubscriptions({ page, take }) });
  return (
    <AdminLayout>
      <TypographyH2 text="Subscriptions" />
      <SubscriptionsTable data={data} isLoading={isLoading} showPagination={true} />
    </AdminLayout>
  );
};
