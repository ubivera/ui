import React, { forwardRef, useRef, ReactNode, Children, isValidElement, useImperativeHandle } from 'react';
import { useClickTriggerHandle, useKeyTriggerHandle, useImperativeButtonHandle } from './handlers';
import { ButtonProps, defaultButtonProps, LabelProps } from './types';
import { Label, LabelRef } from './Label';
import './styles.scss';

export const Button = forwardRef<
    {
        click: () => void;
        updateLabel: (newLabel: string) => void
    },
    ButtonProps & { children: ReactNode }
    >(( {
        children, onClick, disabled, label, type = 'button', variant = 'secondary', className = ''
    }, ref) => {
        const buttonProps = defaultButtonProps({ children, onClick, disabled, label, type, variant, className });
        const buttonRef = useRef<HTMLButtonElement>(null);
        const labelRef = useRef<LabelRef>(null);

        useImperativeHandle(ref, () => ({
            click: () => {
                if (buttonRef.current && !disabled) {
                    buttonRef.current.click();
                }
            },
            updateLabel: (newLabel: string) => {
                if (labelRef.current) {
                    labelRef.current.setText(newLabel);
                }
            },
        }));

        useImperativeButtonHandle(ref, buttonRef, buttonProps.disabled);

        return(
            <button
                ref={buttonRef}
                tabIndex={0}
                role='button'
                type={buttonProps.type}
                disabled={buttonProps.disabled}
                aria-label={buttonProps.label}
                aria-disabled={buttonProps.disabled}
                className={`btn ${buttonProps.variant}${buttonProps.className && ' ' + buttonProps.className}`}
                onClick={(event) => useClickTriggerHandle(event, buttonProps.onClick)}
                onKeyDown={(event) => useKeyTriggerHandle(event, buttonProps.onClick, buttonProps.disabled)}
            >
                {Children.map(children, (child) => {
                    if (isValidElement(child)) {
                        if (child.type === Label) {
                            const clonedElement = React.cloneElement(child as React.ReactElement<LabelProps>, {
                                text: buttonProps.label || '',
                            });
                            return React.cloneElement(clonedElement);
                        }
                        return child;
                    }
                    return null;
                })}
            </button>
        );
    }
);

export default Button;