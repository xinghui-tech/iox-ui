export type DialogAction = 'confirm' | 'cancel';
export type DialogOptions = {
  lang?: string;
  show?: boolean;
  value?: any;
  title?: string;
  width?: string | number;
  zIndex?: number;
  theme?: string;
  message?: string;
  overlay?: boolean;
  ariaLabel?: string;
  className?: string;
  customStyle?: string;
  transition?: string;
  businessId?: number;
  sessionFrom?: string;
  overlayStyle?: string;
  appParameter?: string;
  messageAlign?: string;
  sendMessageImg?: string;
  showMessageCard?: boolean;
  sendMessagePath?: string;
  sendMessageTitle?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  showConfirmButton?: boolean;
  showCancelButton?: boolean;
  closeOnClickOverlay?: boolean;
  confirmButtonOpenType?: string;
};

export const defaultOptions: DialogOptions = {
  show: false,
  title: '',
  theme: 'default',
  message: '',
  zIndex: 100,
  overlay: true,
  className: '',
  transition: 'scale',
  customStyle: '',
  messageAlign: '',
  overlayStyle: '',
  confirmButtonText: '确认',
  cancelButtonText: '取消',
  showConfirmButton: true,
  showCancelButton: false,
  closeOnClickOverlay: false,
  confirmButtonOpenType: ''
};

export function dialog(message?: string, title = '', options?: DialogOptions) {
  const show = typeof message !== 'undefined';
  return {...defaultOptions, message, title, show, ...options};
}

export function confirm(message: string , title = '', options?: DialogOptions) {
  return dialog(message, title, {showCancelButton: true, ...options});
}

