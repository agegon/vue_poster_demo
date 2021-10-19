import { ERROR_TYPES } from '@/constants/errors';

const DEFAULT_MESSAGE = 'Unknown request error';

export class UnknownError extends Error {
  constructor(domain, message = DEFAULT_MESSAGE) {
    super(message);

    this.domain = domain;
    this.name = ERROR_TYPES.UNKNOWN_REQUEST_ERROR;
  }
}
