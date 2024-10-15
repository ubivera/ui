export interface ButtonProps<T = HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<T>) => void;
  disabled?: boolean;
  type?: 'reset' | 'submit' | 'button';
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  className?: string;
};

export const defaultButtonProps = (overrides: Partial<ButtonProps> = {}): ButtonProps => ({
  children: null,
  onClick: undefined,
  disabled: false,
  type: 'button',
  variant: 'secondary',
  className: '',
  ...overrides,
});

export interface LabelProps {
  text: string;
}