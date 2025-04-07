export interface FeedbackProps {
  name: string;
  email: string;
  comments: string;
  accepted: boolean;
}

export class Feedback {
  private props: FeedbackProps;

  constructor(props: FeedbackProps) {
    this.props = props;
  }

  get name() {
    return this.props.name;
  }
  get email() {
    return this.props.email;
  }
  get comments() {
    return this.props.comments;
  }
  get accepted() {
    return this.props.accepted;
  }

  isValidEmail(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.props.email);
  }

  isValid(): boolean {
    return (
      this.props.name.trim() !== '' &&
      this.isValidEmail() &&
      this.props.comments.trim().length >= 10 &&
      this.props.accepted === true
    );
  }

  getErrors(): string[] {
    const errors: string[] = [];
    if (!this.props.name.trim()) errors.push('Name is required.');
    if (!this.isValidEmail()) errors.push('Email is invalid.');
    if (this.props.comments.trim().length < 10)
      errors.push('Comment must be at least 10 characters.');
    if (!this.props.accepted) errors.push('Terms must be accepted.');
    return errors;
  }
}
