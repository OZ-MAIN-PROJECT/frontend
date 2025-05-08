export type AlertStatus = 'success' | 'error' | 'forbidden';

export interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface AlertModalProps extends BaseModalProps {
  status: AlertStatus;
  title: string;
  description?: string;
  confirmText?: string;
  onConfirm?: () => void;
}

export interface BlankModalProps extends BaseModalProps {
  width?: string;
  height?: string;
  children?: React.ReactNode;
}
