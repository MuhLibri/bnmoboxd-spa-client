import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.tsx';
import { FilmComboBox } from '@/components/curator/film-combo-box.tsx';
import { Textarea } from '@/components/ui/textarea.tsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.tsx';
import { Button } from '@/components/ui/button.tsx';
import { CuratorReview } from '@/utils/interfaces.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postCuratorReview, putCuratorReview } from '@/services/reviews.ts';

const reviewFormSchema = z.object({
  filmId: z.string({ required_error: 'Please choose a film' }).transform(val => parseInt(val)),
  review: z.string({ required_error: 'Please fill in your review' }).min(20, 'Review should at least be 20 characters long'),
  rating: z.string({ required_error: 'Please choose a rating' }).transform(val => parseInt(val)),
});
export const ReviewForm = ({ review, onSuccess }: { review?: CuratorReview; onSuccess: () => void }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (newReview: CuratorReview) => {
      if (review && review.id) {
        return putCuratorReview(newReview, review.id);
      }
      return postCuratorReview(newReview);
    },
    onSuccess: () => {
      onSuccess();
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
  });

  const form = useForm<z.infer<typeof reviewFormSchema>>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      filmId: review?.filmId.toString(),
      review: review?.review,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      rating: review?.rating.toString(),
    },
  });

  const onSubmit = (values: z.infer<typeof reviewFormSchema>) => {
    mutation.mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="filmId"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Film</FormLabel>
              <FilmComboBox field={field} form={form} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="review"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Review</FormLabel>
              <FormControl>
                <Textarea placeholder="Review" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Rating</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                <FormControl>
                  <SelectTrigger className={field.value ? '' : 'text-muted-foreground'}>
                    <SelectValue placeholder="Select rating" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Array.from({ length: 5 }).map((_, i) => {
                    return (
                      <SelectItem value={(i + 1).toString()} key={i}>
                        {i + 1}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end w-full">
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
      {mutation.isError && <p className="text-destructive text-sm">An unexpected error occurred</p>}
    </Form>
  );
};
