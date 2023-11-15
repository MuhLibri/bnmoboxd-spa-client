import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx';
import { VITE_REST_API_URL } from '@/utils/config.ts';
import { Button } from '@/components/ui/button.tsx';
import { EditIcon } from 'lucide-react';
import { Input } from '@/components/ui/input.tsx';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.tsx';
import { Textarea } from '@/components/ui/textarea.tsx';
import { z } from 'zod';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProfile, UpdateProfilePayload, uploadProfileImage } from '@/services/curator.ts';
import { User } from '@/utils/interfaces.ts';
import { AxiosError } from 'axios';
import { setProfilePicturePath } from '@/utils/token-storage.ts';

export const ProfileForm = ({ data }: { data: User | undefined }) => {
  const query = useQueryClient();
  const editProfileSchema = z.object({
    firstName: z.string({ required_error: "First name can't be empty" }).min(3, { message: 'First name should be at least 3 characters' }),
    lastName: z.string(),
    email: z.string().optional(),
    username: z.string().optional(),
    bio: z.string().max(255, { message: "Bio can't be longer than 255 characters" }),
  });
  const fileInput = useRef<HTMLInputElement | null>(null);
  const form = useForm<z.infer<typeof editProfileSchema>>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      firstName: data?.firstName,
      lastName: data?.lastName || '',
      username: data?.username,
      email: data?.email,
      bio: data?.bio || '',
    },
  });
  const navigate = useNavigate();
  const { toast } = useToast();
  const imageMutation = useMutation({
    mutationFn: (payload: FormData) => {
      return uploadProfileImage(payload);
    },
    onSuccess: () => {
      toast({
        description: 'Profile image updated successfully',
      });
      navigate('/profile');
      query.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: err => {
      if (err instanceof AxiosError) {
        toast({
          description: err.response?.data.message,
        });
        navigate('/');
      }
    },
  });

  const updateMutation = useMutation({
    mutationFn: (payload: UpdateProfilePayload) => {
      return updateProfile(payload);
    },
    onSuccess: () => {
      toast({
        description: 'Profile updated',
      });
      navigate('/');
    },
    onError: err => {
      if (err instanceof AxiosError) {
        toast({
          description: err.response?.data.message,
        });
      }
    },
  });

  const onFileButtonClick = () => {
    fileInput?.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      imageMutation.mutate(formData);
    }
  };

  useEffect(() => {
    if (data) {
      setProfilePicturePath(data.profileImage);
    }
  }, [data]);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="relative">
        <Avatar className="w-40 h-40">
          <AvatarImage src={`${VITE_REST_API_URL}/static/images/${data?.profileImage}`} />
          <AvatarFallback>{data?.username[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <Button className="rounded-full absolute right-0 bottom-0" onClick={onFileButtonClick}>
          <EditIcon className="text-xs" />
        </Button>
        <Input type="file" onChange={handleFileChange} ref={fileInput} className="hidden" accept="image/*" />
      </div>
      <Form {...form}>
        <form className="space-y-8 w-full lg:w-[600px]" onSubmit={form.handleSubmit(values => updateMutation.mutate(values))}>
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="First Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Last Name <span className="text-muted-foreground italic">(optional)</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Last Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input disabled placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input disabled placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea placeholder="Bio" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end w-full">
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
