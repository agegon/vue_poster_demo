import { ERROR_TYPES } from '@/constants/errors';

export class AuthorizationError extends Error {
  constructor() {
    super('User authorization error');
    this.name = ERROR_TYPES.AUTHORIZATION_ERROR;
  }
}
