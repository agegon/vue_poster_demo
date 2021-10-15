export class ValidationError extends Error {
  constructor({ message, errors }) {
    super(message);
    this.name = 'validationError';
    this.errors = errors;
  }
}
