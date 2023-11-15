import { CuratorLayout } from '@/components/layout/curator-layout.tsx';
import { TypographyH2 } from '@/components/ui/typography.tsx';
import { useQuery } from '@tanstack/react-query';
import { getProfile } from '@/services/curator.ts';
import { ProfileForm } from '@/components/curator/profile-form.tsx';

export const ProfilePage = () => {
  const { data, isLoading } = useQuery({ queryKey: ['profile'], queryFn: () => getProfile() });

  return (
    <CuratorLayout>
      <div className="flex w-full justify-between flex-col">
        <TypographyH2 text="Profile" />
        {!isLoading && <ProfileForm data={data} />}
      </div>
    </CuratorLayout>
  );
};
