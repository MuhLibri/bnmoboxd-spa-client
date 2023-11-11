import { SUBSCRIPTION_STATUS } from '@/utils/interfaces.ts';
import { Badge } from '@/components/ui/badge.tsx';

export const VerificationBadge = ({ status }: { status: SUBSCRIPTION_STATUS }) => {
  let color = 'text-yellow-100 bg-yellow-800 font-bold text-md';
  if (status == 'REJECTED') color = 'text-rose-100 bg-destructive font-bold text-md';
  if (status == 'ACCEPTED') color = 'text-teal-100 bg-teal-900 font-bold text-md';
  return <Badge className={color}>{status}</Badge>;
};
