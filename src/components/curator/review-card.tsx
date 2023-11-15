import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { StarIcon } from 'lucide-react';
import { EditReviewModal } from '@/components/curator/review-modal.tsx';
import { DeleteReviewDialog } from '@/components/curator/delete-review-dialog.tsx';
import dayjs from 'dayjs';
import { CreatedCuratorReview } from '@/services/reviews.ts';
import { VITE_PHP_API_URL } from '@/utils/config.ts';

export function ReviewCard({ data }: { data: CreatedCuratorReview }) {
  return (
    <Card className="w-full flex items-stretch flex-col">
      <CardHeader className="items-start gap-4 space-y-0 flex flex-grow">
        <div className="space-y-4 flex w-full items-center justify-center lg:justify-start">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <img src={`${VITE_PHP_API_URL}/assets/films/${data.film.imagePath}`} alt={data.film.title} className="w-40 h-64 object-contain" />
            <div className="flex flex-col gap-4">
              <CardTitle className="text-primary">{data.film.title}</CardTitle>
              <CardDescription>{data.review}</CardDescription>
              <div className="flex flex-row items-center">
                {[...Array(data.rating)].map((_, i) => {
                  return <StarIcon key={i} className="mr-1 h-3 w-3 text-teal-400 fill-teal-400" />;
                })}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardFooter className="gap-4 self-end flex flex-row justify-between w-full">
        <div className="flex text-xs lg:text-sm text-muted-foreground">
          {data.updatedAt && <div>Updated on {dayjs(new Date(data.updatedAt)).format('DD MMMM YYYY')}</div>}
        </div>
        <div className="space-x-4">
          <EditReviewModal review={data} />
          <DeleteReviewDialog reviewId={data.id} />
        </div>
      </CardFooter>
    </Card>
  );
}
