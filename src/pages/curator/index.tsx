import { TypographyH2 } from '@/components/ui/typography.tsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { ChevronRight, Loader2, MessageCircle, User2 } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import { useQuery } from '@tanstack/react-query';
import { getCuratorReviews } from '@/services/reviews.ts';
import { ReviewCard } from '@/components/curator/review-card.tsx';
import { CuratorLayout } from '@/components/layout/curator-layout.tsx';
import { useNavigate } from 'react-router-dom';
import { getSubscriptionCount } from '@/services/subscriptions.ts';

const CuratorDashboard = () => {
  const reviewsQuery = useQuery({ queryKey: ['reviews'], queryFn: () => getCuratorReviews({ page: 1, take: 6 }) });
  const subsQuery = useQuery({ queryKey: ['subs-count'], queryFn: () => getSubscriptionCount() });
  const navigate = useNavigate();
  return (
    <CuratorLayout>
      <TypographyH2 text="Curator Dashboard" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-medium">Subscribers</CardTitle>
            <User2 />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{subsQuery.data?.count}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-medium">Reviews</CardTitle>
            <MessageCircle />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{reviewsQuery.data?.count}</div>
          </CardContent>
        </Card>
      </div>
      <Card className="p-4 lg:p-10">
        <CardHeader className="items-start p-0 pb-6">
          <CardTitle>Your Reviews</CardTitle>
        </CardHeader>
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-6">
          {reviewsQuery.data?.reviews.map(review => {
            return <ReviewCard key={review.id} data={review} />;
          })}
        </div>
        {reviewsQuery.isLoading && (
          <div className="w-full h-full flex items-center justify-center">
            <Loader2 className="mr-2 h-12 w-12 animate-spin" />{' '}
          </div>
        )}
        <div className="flex justify-end w-full py-4">
          <Button variant="outline" className="border-primary" onClick={() => navigate('/reviews')}>
            See All Reviews <ChevronRight />
          </Button>
        </div>
      </Card>
    </CuratorLayout>
  );
};

export default CuratorDashboard;
