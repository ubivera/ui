import React from 'react';

export interface ButtonImageProps {
  Source: string;
  Placement?: 'Left' | 'Right';
  Alt?: string;
  ClassName?: string;
  Style?: React.CSSProperties;
}

const ButtonImage: React.FC<ButtonImageProps> = ({
  Source: source,
  Placement: placement = 'Left',
  Alt: alt = '',
  ClassName: className = '',
  Style: style,
}) => {
  const positionClass = placement === 'Right' ? 'rgt' : 'lft';
  const imageClassName = `img ${positionClass}${className ? ' ' + className : ''}`;

  return <img src={source} className={imageClassName} alt={alt} style={style} />;
};

ButtonImage.displayName = 'ButtonImage';
export default ButtonImage;