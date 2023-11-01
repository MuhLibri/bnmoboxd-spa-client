import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog.tsx';
import { Button } from '@/components/ui/button.tsx';
import { EditIcon } from 'lucide-react';
import { ReviewForm } from '@/components/curator/review-form.tsx';
import { CuratorReview } from '@/utils/interfaces.ts';
import { useState } from 'react';

export const EditReviewModal = ({ review }: { review: CuratorReview }) => {
  const [open, setOpen] = useState(false);
  const onSuccess = () => {
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="icon" className="p-0 hover:border-0 hover:bg-none">
          <EditIcon className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit review</DialogTitle>
          <DialogDescription>Make changes to review.</DialogDescription>
        </DialogHeader>
        <ReviewForm review={review} onSuccess={onSuccess} />
      </DialogContent>
    </Dialog>
  );
};

export const CreateReviewModal = () => {
  const [open, setOpen] = useState(false);
  const onSuccess = () => {
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>New Review</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New review</DialogTitle>
          <DialogDescription>Create a new review</DialogDescription>
        </DialogHeader>
        <ReviewForm onSuccess={onSuccess} />
      </DialogContent>
    </Dialog>
  );
};
