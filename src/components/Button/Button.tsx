import React, { forwardRef, useRef } from 'react';
import { useClickTriggerHandle, useKeyTriggerHandle, useImperativeButtonHandle } from './handlers';
import { ButtonProps, defaultButtonProps } from './types';
import './styles.scss';

export const Button =
    forwardRef<
        { click: () => void; },
        ButtonProps
    >(( {
        children, onClick, disabled, type = 'button', variant = 'secondary', className = ''
    }, ref) => {
        const buttonProps = defaultButtonProps({ children, onClick, disabled, type, variant, className });
        const buttonRef = useRef<HTMLButtonElement>(null);
        useImperativeButtonHandle(ref, buttonRef, buttonProps.disabled);

        return(
            <button
                ref={buttonRef}
                tabIndex={0}
                role='button'
                type={buttonProps.type}
                disabled={buttonProps.disabled}
                aria-disabled={buttonProps.disabled}
                className={`btn ${buttonProps.variant}${buttonProps.className && ' ' + buttonProps.className}`}
                onClick={(event) => useClickTriggerHandle(event, buttonProps.onClick)}
                onKeyDown={(event) => useKeyTriggerHandle(event, buttonProps.onClick, buttonProps.disabled)}
            >
                {buttonProps.children}
            </button>
        );
    }
);

export default Button;