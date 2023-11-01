import Layout from '@/components/layout/layout.tsx';

export const ErrorLayout = ({ code, message }: { code: number; message: string }) => {
  return (
    <Layout>
      <div className="w-full h-screen flex items-center justify-center">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          {code} | {message}
        </h2>
      </div>
    </Layout>
  );
};
