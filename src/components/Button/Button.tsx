/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Ubivera. All rights reserved.
 *  Licensed under the MIT License. See LICENSE.md in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React, { forwardRef } from 'react';
import type ButtonVariant from '../../utils/buttonVariants';
import type ButtonSize from '../../utils/buttonSizes';
import classNames from 'classnames';
import './Button.scss';

/**
 * Predefined size classes for the Button component.
 */
const sizeClasses: Record<ButtonSize, string> = {
    small: 'small',
    medium: 'medium',
    large: 'large',
};

const variantClasses: Record<ButtonVariant, string> = {
    primary: 'primary',
    secondary: 'secondary',
};

/**
 * Creates a ripple effect on button click with type safety and error handling.
 * 
 * @param {React.MouseEvent<HTMLButtonElement>} event - The click event.
 */
function createRipple(event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>) {
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
        const buttonRect = button.getBoundingClientRect();

        if (event.type === 'click') {
            const mouseEvent = event as React.MouseEvent;
            circle.style.left = `${mouseEvent.clientX - buttonRect.left - radius}px`;
            circle.style.top = `${mouseEvent.clientY - buttonRect.top - radius}px`;
        } else if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Enter' || (event as React.KeyboardEvent).key === ' ')) {
            circle.style.left = `${buttonRect.width / 2 - radius}px`;
            circle.style.top = `${buttonRect.height / 2 - radius}px`;
        } else {
            return;
        }

        circle.classList.add('ripple');

        const existingRipple = button.getElementsByClassName('ripple')[0];
        if (existingRipple) {
            existingRipple.remove();
        }

        button.appendChild(circle);

        setTimeout(() => {
            circle.remove();
        }, 380);
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
            'button',
            sizeClasses[size],
            variantClasses[variant],
            {
                'disabled cursor-not-allowed': disabled || isLoading,
                'active': active,
            },
            className
        );

        const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            createRipple(event); 
            
            if (onClick) {
                onClick(event); 
            }
        };

        const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
            if (event.key === 'Enter' || event.key === ' ') {
                createRipple(event);
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
                onKeyDown={handleKeyDown}
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