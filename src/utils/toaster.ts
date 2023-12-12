import { toast } from 'react-toastify';

export const toastTypes = {
  SUCCESS: 'success',
  ERROR: 'error',
};

const toaster = (type: string, message: string) => {
  if (type == toastTypes?.SUCCESS) toast.success(message);
  else if (type == toastTypes?.ERROR) toast.error(message);
};
export default toaster;
