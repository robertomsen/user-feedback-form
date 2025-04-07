import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, vi, expect, beforeEach } from 'vitest';
import { FeedbackProvider } from '@context/FeedbackProvider';
import * as FeedbackApi from '@infrastructure/services/FeedbackApi';
import FormPage from '../FormPage';

vi.spyOn(FeedbackApi, 'sendFeedback').mockResolvedValue(undefined);

describe('FormPage', () => {
  beforeEach(() => {
    render(
      <FeedbackProvider>
        <FormPage />
      </FeedbackProvider>,
    );
  });

  it('debe renderizar todos los campos del formulario', () => {
    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/comentarios/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/acepto los términos/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /enviar/i })).toBeInTheDocument();
  });

  it('debe mostrar errores si se envía vacío', async () => {
    fireEvent.click(screen.getByRole('button', { name: /enviar/i }));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/email is invalid/i)).toBeInTheDocument();
    expect(screen.getByText(/comment must be at least/i)).toBeInTheDocument();
    expect(screen.getByText(/terms must be accepted/i)).toBeInTheDocument();
  });

  it('envía feedback válido y muestra mensaje de éxito', async () => {
    fireEvent.input(screen.getByLabelText(/nombre/i), {
      target: { value: 'Juan' },
    });
    fireEvent.input(screen.getByLabelText(/email/i), {
      target: { value: 'juan@example.com' },
    });
    fireEvent.input(screen.getByLabelText(/comentarios/i), {
      target: { value: 'Esto es genial!' },
    });
    fireEvent.click(screen.getByLabelText(/acepto los términos/i));

    fireEvent.click(screen.getByRole('button', { name: /enviar/i }));

    const successMessage = await screen.findByRole('status');
    expect(successMessage).toHaveTextContent(/gracias por tu feedback/i);
  });
});
