import { TypographyH2 } from '@/components/ui/typography.tsx';
import { SubscriptionsTable } from '@/components/admin/subscriptions-table.tsx';
import { AdminLayout } from '@/components/layout/admin-layout.tsx';

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <TypographyH2 text="Admin Dashboard" />
      <SubscriptionsTable />
    </AdminLayout>
  );
};

export default AdminDashboard;
