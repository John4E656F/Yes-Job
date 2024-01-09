export enum ToastTitle {
  Success = 'Success',
  Error = 'Error',
  Info = 'Info',
  Warning = 'Warning',
  Message = 'Message',
}

export interface ToastProps {
  isOpen: boolean;
  onClose?: () => void;
  title: ToastTitle;
  message: string;
  link?: {
    href: string;
    text: string;
  };
  linkMessage?: string;
}
