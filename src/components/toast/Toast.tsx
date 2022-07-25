import React, { ReactElement } from 'react';
import './toast.css';

type ToastProps = {
  hideToast: () => void;
  message: string;
};

const Toast = ({ hideToast, message }: ToastProps):ReactElement => {
  setTimeout(() => hideToast(), 5000);
  return (
    <div
      className="toast"
      onClick={() => hideToast()}
    >
      <p className="font-primary">{message}</p>
    </div>
  );
};

export default Toast;
