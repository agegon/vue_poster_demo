export class AuthorizationError extends Error {
  constructor() {
    super('User authorization error');
    this.name = 'Authorization error';
  }
}
