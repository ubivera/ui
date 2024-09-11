/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Ubivera. All rights reserved.
 *  Licensed under the MIT License. See LICENSE.md in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React, { forwardRef } from 'react';
import type ButtonVariant from '../../utils/buttonVariants';
import type ButtonSize from '../../utils/buttonSizes';
import classNames from 'classnames';
import styles from './Button.module.scss';

/**
 * Predefined size classes for the Button component.
 */
const sizeClasses: Record<ButtonSize, string> = {
    small: 'px-2 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
};

/**
 * Creates a ripple effect on button click with type safety and error handling.
 * 
 * @param {React.MouseEvent<HTMLButtonElement>} event - The click event.
 */
function createRipple(event: React.MouseEvent<HTMLButtonElement>) {
    try {
        const button = event.currentTarget as HTMLButtonElement | null;

        if (!button) {
            console.error('Ripple effect failed: The event target is not a button element.');
            return;
        }

        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
        circle.classList.add(styles['ripple']);

        const existingRipple = button.getElementsByClassName(styles['ripple'])[0];
        if (existingRipple) {
            existingRipple.remove();
        }

        button.appendChild(circle);
        console.log('Reached end.');
    } catch (error) {
        console.error('An error occurred while creating the ripple effect: ', error);
    }
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
    isLoading?: boolean;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
};

/**
 * Button Component
 *
 * This is a reusable button component designed for extensibility, accessibility, and flexibility.
 * It supports multiple variants, sizes, icons, and loading states. The component also handles
 * accessibility features such as `aria-disabled` and `aria-busy`.
 *
 * @component
 * @example
 * ```tsx
 * <Button variant="primary" size="large" isLoading={false}>
 *   Click Me
 * </Button>
 * ```
 *
 * @param {ButtonProps} props - The props for the button component.
 * @param {ButtonVariant} [props.variant='primary'] - The style variant of the button (e.g., primary, secondary).
 * @param {ButtonSize} [props.size='medium'] - The size of the button (e.g., small, medium, large).
 * @param {boolean} [props.isLoading=false] - If true, shows a loading state.
 * @param {React.ReactNode} [props.startIcon] - Icon to be placed at the start of the button text.
 * @param {React.ReactNode} [props.endIcon] - Icon to be placed at the end of the button text.
 * @param {boolean} [props.disabled] - If true, disables the button.
 * @param {React.ButtonHTMLAttributes<HTMLButtonElement>} props - The default button HTML props.
 *
 * @returns {JSX.Element} A customizable button component.
 * @see [Wiki](https://github.com/ubivera/ui/wiki/Button)
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'medium', isLoading = false, startIcon, endIcon, children, disabled, onClick, ...props }, ref) => {
        const classes = classNames(
            styles['button'],
            styles[variant],
            sizeClasses[size],
            { 'cursor-not-allowed opacity-50': disabled || isLoading },
            className
        );

        const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            createRipple(event); 
            
            if (onClick) {
                onClick(event); 
            }
        };

        return (
            <button
                {...props}
                className={classes}
                disabled={disabled || isLoading}
                aria-disabled={disabled || isLoading}
                aria-busy={isLoading}
                onClick={handleClick}
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