import { cn } from '@/lib/utils.ts';
import { Button, buttonVariants } from '@/components/ui/button.tsx';
import { useLocation } from 'react-router-dom';
import { Card } from '@/components/ui/card.tsx';
import { LogoutDialog } from '@/components/auth/logout-dialog.tsx';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu.tsx';
import { MenuIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx';
import { VITE_REST_API_URL } from '@/utils/config.ts';
import { getProfilePicturePath, getUsername } from '@/utils/token-storage.ts';

interface NavItem {
  title: string;
  link: string;
}
export const SideBar = ({ items, isUser }: { items: NavItem[]; isUser?: boolean }) => {
  const pathname = useLocation().pathname;
  const profileImage = getProfilePicturePath();
  const username = getUsername();
  const NavItem = ({ item }: { item: NavItem }) => {
    return (
      <a
        href={item.link}
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          pathname === item.link ? 'bg-muted hover:bg-muted' : 'hover:bg-transparent hover:text-primary',
          'justify-start text-accent-foreground font-normal',
        )}
      >
        {item.title}
      </a>
    );
  };
  return (
    <Card className="p-8 flex lg:flex-col justify-between max-h-screen sticky top-0">
      <div className="space-y-2 flex lg:space-y-8 lg:flex-col justify-between w-full">
        <img src="/logo.png" alt="logo" className="lg:mx-auto w-[100px] lg:w-[150px]" />
        <nav className="space-x-2 lg:space-x-0 lg:space-y-1 hidden lg:flex lg:flex-col">
          {items.map(item => (
            <NavItem item={item} key={item.link} />
          ))}
        </nav>
        <div className="lg:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="icon">
                <MenuIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {items.map(item => (
                <DropdownMenuItem key={item.link}>
                  <NavItem item={item} />
                </DropdownMenuItem>
              ))}
              <div className="px-4 pb-4">
                <LogoutDialog />
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="hidden lg:flex lg:flex-col lg:gap-4">
        {isUser && (
          <a href="/profile" className="flex justify-start w-full gap-4 bg-muted rounded-md p-4 items-center">
            <Avatar>
              <AvatarImage src={`${VITE_REST_API_URL}/static/images/${profileImage}`} />
              <AvatarFallback>{username && username[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <p>{username}</p>
          </a>
        )}
        <LogoutDialog />
      </div>
    </Card>
  );
};
