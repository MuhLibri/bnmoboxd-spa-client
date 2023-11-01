import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button.tsx';
import { useState } from 'react';

export const AcceptDialog = () => {
  // const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  // const mutation = useMutation({
  //     mutationFn: () => {
  // return deleteCuratorReview(reviewId);
  //     },
  //     onSuccess: () => {
  //         setOpen(false);
  //         queryClient.invalidateQueries({ queryKey: ['reviews'] });
  //     },
  // });
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button>Accept</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">Are you sure you want to accept user A&apos;s subscription to curator B?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Yes</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export const RejectDialog = () => {
  // const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  // const mutation = useMutation({
  //     mutationFn: () => {
  // return deleteCuratorReview(reviewId);
  //     },
  //     onSuccess: () => {
  //         setOpen(false);
  //         queryClient.invalidateQueries({ queryKey: ['reviews'] });
  //     },
  // });
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="secondary">Reject</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">Are you sure you want to reject user A&apos;s subscription to curator B?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Yes</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
