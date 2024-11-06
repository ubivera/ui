import React from 'react';

export interface ButtonImageProps {
  Source: string;
  Placement?: 'Left' | 'Right';
  Alt?: string;
  Style?: string;
  Classes?: React.CSSProperties;
}

const ButtonImage: React.FC<ButtonImageProps> = ({
  Source: source,
  Placement: placement = 'Left',
  Alt: alt = '',
  Style = '',
  Classes = {height: "18px", width: "18px"},
}) => {
  const positionClass = placement === 'Right' ? 'rgt' : 'lft';
  const imageClassName = `img ${positionClass}${Style ? ' ' + Style : ''}`;

  return <img src={source} className={imageClassName} alt={alt} style={Classes} />;
};

ButtonImage.displayName = 'ButtonImage';
export default ButtonImage;