export class UnknownError extends Error {
  constructor(domain) {
    super('Unknown request error');

    this.domain = domain;
    this.name = 'Unknown request error';
  }
}
