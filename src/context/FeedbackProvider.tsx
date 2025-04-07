import React, { useReducer, useState } from 'react';
import { SubmitFeedback } from '@application/useCases/SubmitFeedback';
import { FeedbackProps } from '@domain/entities/Feedback';
import FeedbackContext from './FeedbackContext';

const initialState: FeedbackProps = {
  name: '',
  email: '',
  comments: '',
  accepted: false,
};

function reducer(
  state: FeedbackProps,
  action:
    | { type: 'SET_FIELD'; field: keyof FeedbackProps; value: string | boolean }
    | { type: 'RESET' },
): FeedbackProps {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export const FeedbackProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);

  const setField = (field: keyof FeedbackProps, value: string | boolean) => {
    dispatch({ type: 'SET_FIELD', field, value });
  };

  const resetForm = () => {
    dispatch({ type: 'RESET' });
    setErrorMessages([]);
    setSuccess(false);
  };

  const submit = async () => {
    setLoading(true);
    setErrorMessages([]);
    setSuccess(false);

    const result = await SubmitFeedback(state);

    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        resetForm();
      }, 2000);
    } else {
      setErrorMessages(result.errors);
    }

    setLoading(false);
  };

  return (
    <FeedbackContext.Provider
      value={{
        state,
        setField,
        resetForm,
        submit,
        loading,
        errorMessages,
        success,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};
