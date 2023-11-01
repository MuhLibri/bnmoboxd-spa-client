import { ErrorLayout } from '@/components/layout/error-layout.tsx';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

export const NotFound = () => {
  return <ErrorLayout code={StatusCodes.NOT_FOUND} message={ReasonPhrases.NOT_FOUND} />;
};
