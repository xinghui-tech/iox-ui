import { WHITE } from './color';

export type NotifyOptions = {
  show?: boolean;
  type?: 'primary' | 'success' | 'danger' | 'warning';
  color?: string;
  zIndex?: number;
  top?: number;
  message: string;
  duration?: number;
  background?: string;
  safeAreaInsetTop?: boolean;
}

export const defaultOptions: NotifyOptions = {
  show: false,
  type: 'danger',
  message: '',
  background: '',
  duration: 3000,
  zIndex: 110,
  top: 0,
  color: WHITE,
  safeAreaInsetTop: false,
};

export function notify(options: NotifyOptions | string | { [key: string]: any } = {show: false}) {
  options = typeof options === 'string' ? { message: options } : options;
  return { ...defaultOptions, show: true, ...options };
}
