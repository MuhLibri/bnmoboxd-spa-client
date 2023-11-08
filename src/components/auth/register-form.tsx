import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { register, RegisterPayload } from '@/services/auth.ts';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/components/ui/use-toast.ts';

const registerFormSchema = z.object({
  email: z.string({ required_error: "Email can't be empty" }).email({ message: 'Email is invalid' }),
  username: z
    .string({ required_error: "Username can't be empty" })
    .min(5, { message: 'Username should be at least 5 characters' })
    .max(16, { message: 'Username should not be longer than 16 characters' }),
  password: z.string({ required_error: "Password can't be empty" }).min(6, { message: 'Password should be at least 6 characters' }),
  firstName: z.string({ required_error: "First name can't be empty" }).min(3, { message: 'First name should be at least 3 characters' }),
  lastName: z.string().optional(),
});
export const RegisterForm = () => {
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (payload: RegisterPayload) => {
      return register(payload);
    },
    onSuccess: () => {
      toast({
        description: 'Register successful! Please wait while we verify your account',
      });
      navigate('/login');
    },
    onError: err => {
      if (err instanceof AxiosError) {
        const fieldErrors = err.response?.data.fieldErrors;
        if (fieldErrors?.username) {
          form.setError('username', {
            type: 'manual',
            message: fieldErrors?.username,
          });
        }
        if (fieldErrors?.email) {
          form.setError('email', {
            type: 'manual',
            message: fieldErrors?.email,
          });
        }
      }
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(values => mutation.mutate(values))} className="space-y-8">
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
                <Input placeholder="Email" {...field} />
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
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end w-full">
          <Button type="submit">Register</Button>
        </div>
      </form>
    </Form>
  );
};
