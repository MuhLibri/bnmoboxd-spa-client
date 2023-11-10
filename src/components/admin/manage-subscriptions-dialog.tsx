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
import { Subscription } from '@/utils/interfaces.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { manageSubscription } from '@/services/subscriptions.ts';
import { useToast } from '@/components/ui/use-toast.ts';
import { AxiosError } from 'axios';

export const AcceptDialog = ({ subscription }: { subscription: Subscription }) => {
  const { toast } = useToast();
  const { curatorUsername, subscriberUsername, status } = subscription;
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => {
      return manageSubscription({ curatorUsername, subscriberUsername, status: 'ACCEPTED' });
    },
    onSuccess: () => {
      toast({
        description: 'Successfully accepted subscription request',
      });
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
    },
    onError: err => {
      if (err instanceof AxiosError) {
        toast({
          description: err.response?.data.message || 'Unexpected error occured',
        });
      }
      setOpen(false);
    },
  });
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button disabled={status != 'PENDING'}>Accept</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">
            Are you sure you want to accept {subscriberUsername}&apos;s subscription to curator {curatorUsername}?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => mutation.mutate()}>Yes</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export const RejectDialog = ({ subscription }: { subscription: Subscription }) => {
  const { toast } = useToast();
  const { curatorUsername, subscriberUsername, status } = subscription;
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => {
      return manageSubscription({ curatorUsername, subscriberUsername, status: 'REJECTED' });
    },
    onSuccess: () => {
      toast({
        description: 'Successfully rejected subscription request',
      });
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
    },
    onError: err => {
      if (err instanceof AxiosError) {
        toast({
          description: err.response?.data.message || 'Unexpected error occured',
        });
      }
      setOpen(false);
    },
  });
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="secondary" disabled={status != 'PENDING'}>
          Reject
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">
            Are you sure you want to reject {subscriberUsername}&apos;s subscription to curator {curatorUsername}?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => mutation.mutate()}>Yes</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
