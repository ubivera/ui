import React from 'react';
import Button, { ButtonProps } from '../Button/Button';
import '../Button/Button.scss';

export interface HyperlinkButtonProps extends ButtonProps {
  NavigateUri?: string;
}

const HyperlinkButton: React.FC<HyperlinkButtonProps> = ({
  NavigateUri,
  Click,
  Command,
  ...props
}) => {
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>
) => {
    if (NavigateUri) {
      window.open(NavigateUri, '_blank');
    } else if (Click) {
      Click(event);
    }

    if (Command) {
      Command(event);
    }
  };

  return (
    <Button
      {...props}
      Click={handleClick}
      Style={`hyperlink ${props.Style || ''}`.trim()}
    />
  );
};

HyperlinkButton.displayName = 'HyperlinkButton';
export default HyperlinkButton;