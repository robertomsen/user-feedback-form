import { useContext } from 'react';
import FeedbackContext from './FeedbackContext';

export const useFeedbackContext = () => {
  const context = useContext(FeedbackContext);
  if (!context) {
    throw new Error('useFeedbackContext must be used within FeedbackProvider');
  }
  return context;
};
