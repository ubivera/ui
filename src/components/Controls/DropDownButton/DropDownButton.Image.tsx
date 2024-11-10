import React from 'react';
import ButtonImage, { ButtonImageProps } from '../Button/Button.Image';

export interface DropDownButtonImageProps extends ButtonImageProps {}

const DropDownButtonImage: React.FC<DropDownButtonImageProps> = (props) => {
    return <ButtonImage {...props} />;
};

DropDownButtonImage.displayName = 'DropDownButtonImage';
export default DropDownButtonImage;