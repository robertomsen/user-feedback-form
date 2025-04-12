import React, { useState, useCallback } from 'react';
import { FeedbackProps } from '@domain/entities/Feedback';
import { FeedbackContext, FeedbackContextType } from './FeedbackContext';

const initialState: FeedbackProps = {
  name: '',
  email: '',
  comments: '',
  accepted: false,
};

export const FeedbackProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<FeedbackProps>(initialState);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const setField = (field: keyof FeedbackProps, value: string | boolean) => {
    setState(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setState(initialState);
    setErrorMessages([]);
    setSuccess(false);
  };

  const validate = useCallback(() => {
    const errors: string[] = [];

    if (!state.name.trim()) errors.push('Name is required');
    if (!state.email.includes('@')) errors.push('Email is invalid');
    if (state.comments.trim().length < 5) errors.push('Comment must be at least 5 characters');
    if (!state.accepted) errors.push('Terms must be accepted');

    return errors;
  }, [state]);

  const submit = useCallback(async () => {
    const errors = validate();
    if (errors.length > 0) {
      setErrorMessages(errors);
      setSuccess(false);
      return;
    }

    setLoading(true);
    setErrorMessages([]);
    setSuccess(false);

    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state),
      });

      if (!res.ok) {
        throw new Error('Unexpected API error');
      }

      setSuccess(true);
      setState(initialState);
    } catch (err: unknown) {
      let errorMessage = 'Error desconocido';

      if (err instanceof Error) {
        const msg = err.message.toLowerCase();
        const isServerError = msg.includes('unexpected') || msg.includes('server');
        errorMessage = isServerError ? 'Error del servidor' : err.message;
      }

      setErrorMessages([errorMessage]);
    } finally {
      setLoading(false);
    }
  }, [state, validate]);

  const value: FeedbackContextType = {
    state,
    setField,
    resetForm,
    submit,
    loading,
    errorMessages,
    success,
  };

  return <FeedbackContext.Provider value={value}>{children}</FeedbackContext.Provider>;
};
