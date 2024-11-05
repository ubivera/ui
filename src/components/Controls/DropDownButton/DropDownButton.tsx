import React, { useState, useRef } from 'react';
import Button, { ButtonProps, ButtonRef } from '../Button/Button';
import DropDownMenuFlyout from './DropDownMenu.Flyout';

interface DropDownButtonProps extends ButtonProps {
    children?: React.ReactNode;
}

const DropDownButton: React.FC<DropDownButtonProps> & { Flyout: typeof DropDownMenuFlyout } = ({
    children,
    ...buttonProps
}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const buttonRef = useRef<ButtonRef>(null);

    const handleButtonClick = () => {
        setIsMenuOpen((prev) => !prev);
    };

    return (
        <>
            <Button {...buttonProps} Click={handleButtonClick} ref={buttonRef}>
                {children}
            </Button>
            {isMenuOpen && buttonRef.current?.buttonElement && (
                <DropDownMenuFlyout
                    Target={{ current: buttonRef.current.buttonElement } as React.RefObject<HTMLElement>} // Create a RefObject from buttonElement
                    onClose={() => setIsMenuOpen(false)}
                >
                    {children}
                </DropDownMenuFlyout>
            )}
        </>
    );
};

DropDownButton.Flyout = DropDownMenuFlyout;

export default DropDownButton;