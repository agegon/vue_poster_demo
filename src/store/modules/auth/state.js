import { AUTH_STATUSES } from '@/constants/auth';

export const state = {
  currentUser: null,
  error: null,
  isSubmitting: false,
  status: AUTH_STATUSES.INITIAL,
  validationErrors: null,
};
