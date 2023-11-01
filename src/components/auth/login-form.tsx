import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { login, LoginPayload } from '@/services/auth.ts';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

const loginFormSchema = z.object({
  username: z.string().min(1, { message: 'Please fill in your username!' }),
  password: z.string().min(1, { message: 'Please fill in your password!' }),
});
export const LoginForm = () => {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: (payload: LoginPayload) => {
      return login(payload);
    },
    onSuccess: () => {
      navigate('/');
    },
  });

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(values => mutation.mutate(values))} className="space-y-8">
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
        {mutation.isError && <p className="text-destructive text-sm">Invalid Credentials</p>}
        <div className="flex justify-end w-full">
          <Button type="submit">Login</Button>
        </div>
      </form>
    </Form>
  );
};
