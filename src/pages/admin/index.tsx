import { TypographyH2 } from '@/components/ui/typography.tsx';
import { SubscriptionsTable } from '@/components/admin/subscriptions-table.tsx';
import { AdminLayout } from '@/components/layout/admin-layout.tsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { ChevronRight, Mails, User2 } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import { useNavigate } from 'react-router-dom';
import { getSubscriptions } from '@/services/subscriptions.ts';
import { useQuery } from '@tanstack/react-query';
import { getUserVerifications } from '@/services/verifications.ts';
import { VerificationsTable } from '@/components/admin/verifications-table.tsx';

const AdminDashboard = () => {
  // const [searchParams] = useSearchParams();
  // const page = parseInt(searchParams.get('page') || '1');
  const subscriptionQuery = useQuery({ queryKey: ['subscriptions', 1, 5], queryFn: () => getSubscriptions({ page: 1, take: 5 }) });
  const verificationQuery = useQuery({ queryKey: ['userVerifications', 1, 5], queryFn: () => getUserVerifications({ page: 1, take: 5 }) });

  const navigate = useNavigate();
  return (
    <AdminLayout>
      <TypographyH2 text="Admin Dashboard" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-medium">Subscription Requests</CardTitle>
            <Mails />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{subscriptionQuery.data?.count}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-medium">Curators Registered</CardTitle>
            <User2 />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{verificationQuery.data?.count}</div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-medium">Recent Subscription Requests</CardTitle>
        </CardHeader>
        <CardContent className="p-10 pt-4">
          <SubscriptionsTable data={subscriptionQuery.data} isLoading={subscriptionQuery.isLoading} showPagination={false} />
          <div className="flex justify-end w-full py-4">
            <Button variant="outline" className="border-primary" onClick={() => navigate('/subscriptions')}>
              Manage Subscriptions <ChevronRight />
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-medium">Recent Verification Requests</CardTitle>
        </CardHeader>
        <CardContent className="p-10 pt-4">
          <VerificationsTable data={verificationQuery.data} isLoading={verificationQuery.isLoading} showPagination={false} />
          <div className="flex justify-end w-full py-4">
            <Button variant="outline" className="border-primary" onClick={() => navigate('/verifications')}>
              Manage Curator Verifications <ChevronRight />
            </Button>
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default AdminDashboard;
