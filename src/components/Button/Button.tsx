import React, { useEffect, useRef } from 'react';
import ButtonLogic from './Button.logic';

type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary' | 'optional';
    onLogicClick?: (event: MouseEvent) => void;
};

export default function Button({ className, variant, onLogicClick, ...props }: ButtonProps) {
    const buttonRef = useRef<HTMLButtonElement>(null);
    let buttonLogic: ButtonLogic | null = null;

    useEffect(() => {
        if (buttonRef.current) {
            buttonLogic = new ButtonLogic(buttonRef.current);

            if (onLogicClick) {
                buttonLogic.setOnClickHandler(onLogicClick);
            }
        }

        return () => {
            buttonLogic?.destroy();
        };
    }, [onLogicClick]);

    return <button ref={buttonRef} {...props} className={variant} />;
}