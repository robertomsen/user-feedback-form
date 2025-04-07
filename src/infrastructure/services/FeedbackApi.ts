import { Feedback } from '@domain/entities/Feedback';
import { apiRequest } from '@infrastructure/http/apiClient';

export async function sendFeedback(feedback: Feedback): Promise<void> {
  await apiRequest('posts', {
    method: 'POST',
    body: {
      name: feedback.name,
      email: feedback.email,
      comments: feedback.comments,
      accepted: feedback.accepted,
    },
  });
}
