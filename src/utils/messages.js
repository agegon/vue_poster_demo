import { ElMessage } from 'element-plus';

export const showError = (message) => {
  ElMessage.error({
    message,
    showClose: true,
    type: 'error',
  });
};

export const showSuccess = (message) => {
  ElMessage.error({
    message,
    showClose: true,
    type: 'success',
  });
};
