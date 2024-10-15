export type ButtonStates = 'default' | 'primary' | 'danger';

export type ButtonPropsWithStates = {
  [K in ButtonStates]?: boolean;
};

export interface ButtonProps<T = HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<T>) => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
};