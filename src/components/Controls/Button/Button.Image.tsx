import React from 'react';

export interface ButtonImageProps {
  Source: string;
  Placement?: 'Left' | 'Right';
}

const ButtonImage: React.FC<ButtonImageProps> = ({ Source: source, Placement: placement }) => {
  const style:string = 'img ' + (placement === 'Left' ? 'lft' : 'rgt');

  return <img src={source} className={style} alt='' />;
};

ButtonImage.displayName = 'ButtonImage';
export default ButtonImage;