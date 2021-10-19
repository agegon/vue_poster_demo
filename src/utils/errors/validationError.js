import { ERROR_TYPES } from '@/constants/errors';

export class ValidationError extends Error {
  constructor({ message, errors }) {
    super(message);

    this.name = ERROR_TYPES.VALIDATION_ERROR;
    this.errors = errors;
  }
}
