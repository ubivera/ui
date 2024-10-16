import React, { FC } from 'react';
import { IconProps } from './types';

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