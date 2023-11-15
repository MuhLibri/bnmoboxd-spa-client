import { CuratorLayout } from '@/components/layout/curator-layout.tsx';
import { TypographyH2 } from '@/components/ui/typography.tsx';
import { ProfileForm } from '@/components/curator/profile-form.tsx';
import { useUser } from '@/context/user-context.tsx';

export const ProfilePage = () => {
  const { user, loading } = useUser();

  return (
    <CuratorLayout>
      <div className="flex w-full justify-between flex-col">
        <TypographyH2 text="Profile" />
        {!loading && <ProfileForm data={user} />}
      </div>
    </CuratorLayout>
  );
};
