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
import { UserVerification } from '@/utils/interfaces.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { manageVerification } from '@/services/verifications.ts';
import { useToast } from '@/components/ui/use-toast.ts';
import { AxiosError } from 'axios';

export const AcceptDialog = ({ userVerification }: { userVerification: UserVerification }) => {
  const { toast } = useToast();
  const { User, status } = userVerification;
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => {
      return manageVerification({ User, status: 'ACCEPTED' });
    },
    onSuccess: () => {
      toast({
        description: 'Successfully accepted verification request',
      });
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ['userVerifications'] });
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
          <AlertDialogTitle className="text-center">Are you sure you want to accept {User.username} as a curator?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => mutation.mutate()}>Yes</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export const RejectDialog = ({ userVerification }: { userVerification: UserVerification }) => {
  const { toast } = useToast();
  const { User, status } = userVerification;
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => {
      return manageVerification({ User, status: 'REJECTED' });
    },
    onSuccess: () => {
      toast({
        description: 'Successfully rejected verification request',
      });
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ['verifications'] });
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
          <AlertDialogTitle className="text-center">Are you sure you want to reject {User.username} as a curator?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => mutation.mutate()}>Yes</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
