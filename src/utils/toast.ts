export type ToastOptions = {
  show?: boolean;
  type?: string;
  mask?: boolean;
  zIndex?: number;
  position?: string;
  duration?: number;
  forbidClick?: boolean;
  loadingType?: string;
  message?: string | number;
}

export const defaultOptions: ToastOptions = {
  type: 'text',
  mask: false,
  message: '',
  show: false,
  zIndex: 1000,
  duration: 2000,
  position: 'middle',
  forbidClick: false,
  loadingType: 'circular',
};

export function toast(options: ToastOptions | string = {show: false}) {
  options = typeof options === 'string' ? {message: options} : options;
  return {...defaultOptions, show: true, ...options};
}

export function loading(options?: ToastOptions | string) {
  options = typeof options === 'string' ? {message: options} : options;
  return toast({type: 'loading', ...options});
}

export function success(options?: ToastOptions | string) {
  options = typeof options === 'string' ? {message: options} : options;
  return toast({type: 'check', ...options});
}

export function fail(options?: ToastOptions | string) {
  options = typeof options === 'string' ? {message: options} : options;
  return toast({type: 'exclamation', ...options});
}
