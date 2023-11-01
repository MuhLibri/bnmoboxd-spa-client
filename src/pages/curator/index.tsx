import { TypographyH2 } from '@/components/ui/typography.tsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { ChevronRight, FilmIcon, Loader2, MessageCircle, User2 } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import { useQuery } from '@tanstack/react-query';
import { getCuratorReviews } from '@/services/reviews.ts';
import { ReviewCard } from '@/components/curator/review-card.tsx';
import { CuratorLayout } from '@/components/layout/curator-layout.tsx';
import { useNavigate } from 'react-router-dom';

const CuratorDashboard = () => {
  const { data, isLoading } = useQuery({ queryKey: ['reviews'], queryFn: () => getCuratorReviews({ page: 1, take: 6 }) });
  const navigate = useNavigate();
  return (
    <CuratorLayout>
      <TypographyH2 text="Curator Dashboard" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-medium">Subscribers</CardTitle>
            <User2 />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">10</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-medium">Favorite Movies</CardTitle>
            <FilmIcon />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">5</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-medium">Reviews</CardTitle>
            <MessageCircle />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">200</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
      </div>
      <Card className="p-4 lg:p-10">
        <CardHeader className="items-start p-0 pb-6">
          <CardTitle>Your Reviews</CardTitle>
        </CardHeader>
        <div className="grid grid-cols-1 lg:grid-cols-3 w-full gap-6">
          {data?.reviews.map(review => {
            return <ReviewCard key={review.id} data={review} />;
          })}
        </div>
        {isLoading && (
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
