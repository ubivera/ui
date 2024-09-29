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
    } catch (error) {
        console.error('An error occurred while creating the ripple effect: ', error);
    }
}

/**
 * ButtonProps Type
 *
 * This defines the props that can be passed to the `Button` component. It extends the default 
 * `ButtonHTMLAttributes` provided by React for a standard HTML button element, and adds additional
 * properties such as `variant`, `size`, `isLoading`, `startIcon`, `endIcon`, and `active`.
 *
 * @typedef {React.ButtonHTMLAttributes<HTMLButtonElement>} ButtonProps - The base props for the button component.
 *
 * @property {ButtonVariant} [variant='primary'] - Specifies the visual style of the button (e.g., primary, secondary).
 * @property {ButtonSize} [size='medium'] - Defines the size of the button (e.g., small, medium, large).
 * @property {boolean} [isLoading=false] - Indicates whether the button is in a loading state (disables the button and shows a loader).
 * @property {React.ReactNode} [startIcon] - Adds an icon element before the button text.
 * @property {React.ReactNode} [endIcon] - Adds an icon element after the button text.
 * @property {boolean} [active=false] - Specifies if the button is in an active state. If true, adds the 'active' class.
 */
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
    isLoading?: boolean;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    active?: boolean;
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
 * @param {boolean} [props.active] - If true, applies the 'active' class to the button.
 * @param {React.ButtonHTMLAttributes<HTMLButtonElement>} props - The default button HTML props.
 *
 * @returns {JSX.Element} A customizable button component.
 * @see [Wiki](https://github.com/ubivera/ui/wiki/Button)
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'medium', isLoading = false, startIcon, endIcon, active, children, disabled, onClick, ...props }, ref) => {
        const classes = classNames(
            styles['button'],
            styles[variant],
            sizeClasses[size],
            { 'cursor-not-allowed opacity-50': disabled || isLoading,
                [styles.active]: active
             },
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