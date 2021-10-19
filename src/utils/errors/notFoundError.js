import { ERROR_TYPES } from '@/constants/errors';

const DEFAULT_MESSAGE = 'Entity not found';

export class NotFoundError extends Error {
  constructor(message = DEFAULT_MESSAGE) {
    super(message);

    this.name = ERROR_TYPES.NOT_FOUND_ERROR;
  }
}
