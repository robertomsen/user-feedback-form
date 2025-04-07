import { createContext } from 'react';
import { FeedbackProps } from '@domain/entities/Feedback';

export type FeedbackContextType = {
  state: FeedbackProps;
  setField: (field: keyof FeedbackProps, value: string | boolean) => void;
  resetForm: () => void;
  submit: () => Promise<void>;
  loading: boolean;
  errorMessages: string[];
  success: boolean;
};

const FeedbackContext = createContext<FeedbackContextType | undefined>(undefined);

export default FeedbackContext;
