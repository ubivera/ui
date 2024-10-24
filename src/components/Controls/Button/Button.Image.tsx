import React from 'react';

export interface ButtonImageProps {
  source: string;
  placement?: 'Before' | 'After';
}

const ButtonImage: React.FC<ButtonImageProps> = ({ source, placement }) => {
  const style:string = 'img ' + (placement === 'Before' ? 'lft' : 'rgt');

  return <img src={source} className={style} alt='' />;
};

ButtonImage.displayName = 'ButtonImage';
export default ButtonImage;