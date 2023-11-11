import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { StarIcon } from 'lucide-react';
import { EditReviewModal } from '@/components/curator/review-modal.tsx';
import { DeleteReviewDialog } from '@/components/curator/delete-review-dialog.tsx';
import * as dayjs from 'dayjs';
import { CreatedCuratorReview } from '@/services/reviews.ts';

export function ReviewCard({ data }: { data: CreatedCuratorReview }) {
  return (
    <Card className="w-full flex items-stretch flex-col">
      <CardHeader className="items-start gap-4 space-y-0 flex flex-grow">
        <div className="space-y-4 max-w-full">
          <CardTitle>{data.film}</CardTitle>
          <CardDescription>{data.review}</CardDescription>
          <div className="flex flex-row items-center">
            {[...Array(data.rating)].map((_, i) => {
              return <StarIcon key={i} className="mr-1 h-3 w-3 text-teal-400 fill-teal-400" />;
            })}
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
