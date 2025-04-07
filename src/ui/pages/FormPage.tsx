import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import { useFeedbackContext } from '@context/useFeedbackContext';
import styles from '@ui/styles/Form.module.css';

const FormPage: React.FC = () => {
  const { state, setField, submit, loading, errorMessages, success } = useFeedbackContext();

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const commentsRef = useRef<HTMLTextAreaElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);

  const hasErrors = useMemo(() => errorMessages.length > 0, [errorMessages]);

  const handleChange = useCallback(
    (field: keyof typeof state) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value =
          e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
        setField(field, value);
      },
    [setField],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      await submit();
    },
    [submit],
  );

  useEffect(() => {
    if (hasErrors) {
      const firstError = errorMessages[0].toLowerCase();
      if (firstError.includes('name')) nameRef.current?.focus();
      else if (firstError.includes('email')) emailRef.current?.focus();
      else if (firstError.includes('comment')) commentsRef.current?.focus();
      else if (firstError.includes('term')) termsRef.current?.focus();
    }
  }, [hasErrors, errorMessages]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Feedback Form</h1>

      {success && (
        <div className={styles.success} role="status">
          🎉 ¡Gracias por tu feedback!
        </div>
      )}

      {hasErrors && (
        <div className={styles.errors} role="alert">
          <ul>
            {errorMessages.map((msg, idx) => (
              <li key={idx}>{msg}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="name">
            Nombre
          </label>
          <input
            id="name"
            className={styles.input}
            type="text"
            value={state.name}
            onChange={handleChange('name')}
            required
            aria-invalid={errorMessages.some(e => e.toLowerCase().includes('name'))}
            ref={nameRef}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            className={styles.input}
            type="email"
            value={state.email}
            onChange={handleChange('email')}
            required
            aria-invalid={errorMessages.some(e => e.toLowerCase().includes('email'))}
            ref={emailRef}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="comments">
            Comentarios
          </label>
          <textarea
            id="comments"
            className={styles.textarea}
            value={state.comments}
            onChange={handleChange('comments')}
            required
            rows={4}
            aria-invalid={errorMessages.some(e => e.toLowerCase().includes('comment'))}
            ref={commentsRef}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={state.accepted}
              onChange={handleChange('accepted')}
              aria-invalid={errorMessages.some(e => e.toLowerCase().includes('term'))}
              ref={termsRef}
            />
            Acepto los términos
          </label>
        </div>

        <button className={styles.button} type="submit" disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
    </div>
  );
};

export default FormPage;
