import { Feedback, FeedbackProps } from '@domain/entities/Feedback';
import { ApiError } from '@infrastructure/http/apiClient';
import { sendFeedback } from '@infrastructure/services/FeedbackApi';

export type SubmitResult = { success: true } | { success: false; errors: string[] };

export async function SubmitFeedback(props: FeedbackProps): Promise<SubmitResult> {
  const feedback = new Feedback(props);

  if (!feedback.isValid()) {
    return {
      success: false,
      errors: feedback.getErrors(),
    };
  }

  try {
    await sendFeedback(feedback);
    return { success: true };
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.status === 401) {
        return { success: false, errors: ['No estás autorizado.'] };
      } else if (error.status === 500) {
        return {
          success: false,
          errors: ['Error del servidor. Intenta más tarde.'],
        };
      }
      return { success: false, errors: [`Error: ${error.message}`] };
    }

    return {
      success: false,
      errors: ['Error inesperado.'],
    };
  }
}
