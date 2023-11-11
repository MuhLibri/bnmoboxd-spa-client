import { TypographyH2 } from '@/components/ui/typography.tsx';
import { VerificationsTable } from '@/components/admin/verifications-table.tsx';
import { AdminLayout } from '@/components/layout/admin-layout.tsx';


export const Verification = () => {
  return (
    <AdminLayout>
      <TypographyH2 text="Curator Verifications" />
      <VerificationsTable />
    </AdminLayout>
  );
};