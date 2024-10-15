import React, { FC } from 'react';

export interface IconProps {
    src: string;
    alt?: string;
    visible?: boolean;
    className?: string;
}

const Icon: FC<IconProps> = ({ src, alt = '', visible = true, className = '' }) => {
    if (!visible) return null;

    return <img className={`btn-icon ${className}`} src={src} alt={alt} />;
};

export const LeftIcon: FC<IconProps> = (props) => {
    return <Icon {...props} className={`btn-icon-left ${props.className}`} />;
};

export const RightIcon: FC<IconProps> = (props) => {
    return <Icon {...props} className={`btn-icon-right ${props.className}`} />;
};