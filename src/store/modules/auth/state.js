import { AUTH_STATUSES } from '@/constants/auth';

export const state = {
  currentUser: null,
  isLoading: false,
  isSubmitting: false,
  status: AUTH_STATUSES.INITIAL,
  validationErrors: null,
};
