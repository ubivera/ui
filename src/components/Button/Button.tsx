/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Ubivera. All rights reserved.
 *  Licensed under the MIT License. See LICENSE.md in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React, { forwardRef } from 'react';
import type ButtonVariant from '@utils/buttonVariants';
import type ButtonSize from '@utils/buttonSizes';
import classNames from 'classnames';

const sizeClasses: Record<ButtonSize, string> = {
    small: 'px-2 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
};

const variantClasses: Record<ButtonVariant, string> = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-500 text-white hover:bg-gray-600'
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
    isLoading?: boolean;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'medium', isLoading = false, startIcon, endIcon, children, disabled, ...props }, ref) => {
        const classes = classNames(
            sizeClasses[size],
            variantClasses[variant],
            { 'cursor-not-allowed opacity-50': disabled || isLoading },
            className
        );

        return (
            <button
                {...props}
                className={classes}
                disabled={disabled || isLoading}
                aria-disabled={disabled || isLoading}
                aria-busy={isLoading}
                ref={ref}
            >
                {startIcon && <span className="mr-2">{startIcon}</span>}
                {isLoading ? <span>Loading...</span> : children}
                {endIcon && <span className="ml-2">{endIcon}</span>}
            </button>
        );
    }
);

Button.displayName = 'Button';
export default Button;