import React from 'react';

export interface ButtonContentProps {
  Content?: string;
  InheritContent?: boolean;
  children?: React.ReactNode;
}

const ButtonContent: React.FC<ButtonContentProps> = ({ Content: content, InheritContent: inheritContent, children }) => {
  if (inheritContent) {
    return <>{content}</>;
  }

  return <>{children || content}</>;
};

ButtonContent.displayName = 'ButtonContent';
export default ButtonContent;