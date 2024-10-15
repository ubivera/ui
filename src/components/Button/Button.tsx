import React, { forwardRef, memo, useRef } from 'react';
import { handleClick, handleKeyPress } from './handlers';
import { useImperativeButtonHandle } from './imperatives';
import { ButtonProps } from './types';

export const Button = memo(forwardRef<
    {
        click: () => void;
    },
    ButtonProps>((
    {
        children,
        onClick,
        disabled = false,
        type = 'button',
        className = ''
    }, ref) => {
        const buttonRef = useRef<HTMLButtonElement>(null);
        useImperativeButtonHandle(ref, buttonRef, disabled);

        return(
            <button
                ref={buttonRef}
                type={type}
                disabled={disabled}
                aria-disabled={disabled}
                className={`custom-button ${className}`}
                onClick={(event) => handleClick(event, onClick)}
                onKeyDown={(event) => handleKeyPress(event, onClick, disabled)}
            >
                {children}
            </button>
        );
    }
));

export default Button;