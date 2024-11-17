import React from 'react';
import ButtonContent, { ButtonContentProps } from '../Button/Button.Content';

export interface DropDownButtonContentProps extends ButtonContentProps {}

const DropDownButtonContent: React.FC<DropDownButtonContentProps> = (props) => {
    return <ButtonContent {...props} />;
};

DropDownButtonContent.displayName = 'DropDownButtonContent';
export default DropDownButtonContent;