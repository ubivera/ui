import React from 'react';

export interface ButtonContentProps {
  content?: string;
  inheritContent?: boolean;
  children?: React.ReactNode;
}

const ButtonContent: React.FC<ButtonContentProps> = ({ content, inheritContent, children }) => {
  if (inheritContent) {
    return <>{content}</>;
  }

  return <>{children || content}</>;
};

ButtonContent.displayName = 'ButtonContent';
export default ButtonContent;