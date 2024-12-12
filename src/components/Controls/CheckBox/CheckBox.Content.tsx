import React from 'react';

export interface CheckBoxContentProps {
    Content?: React.ReactNode;
    children?: React.ReactNode;
}

const CheckBoxContent: React.FC<CheckBoxContentProps> = ({ Content, children }) => {
    return <>{children || Content}</>;
};

CheckBoxContent.displayName = 'CheckBoxContent';
export default CheckBoxContent;