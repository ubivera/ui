import React, { useState, useRef, ReactNode } from 'react';
import Button, { ButtonProps, ButtonRef } from '../Button/Button';
import DropDownMenuFlyout from './DropDownMenu.Flyout';

interface DropDownButtonProps extends ButtonProps {
    children?: ReactNode;
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

    const buttonChildren = React.Children.toArray(children).filter(
        (child) => (child as React.ReactElement).type !== DropDownMenuFlyout
    );

    const flyoutChild = React.Children.toArray(children).find(
        (child) => (child as React.ReactElement).type === DropDownMenuFlyout
    ) as React.ReactElement | undefined;

    return (
        <>
            <Button {...buttonProps} Click={handleButtonClick} ref={buttonRef}>
                {buttonChildren}
            </Button>
            {isMenuOpen && buttonRef.current?.buttonElement && flyoutChild && (
                <DropDownMenuFlyout
                    Target={{ current: buttonRef.current.buttonElement }}
                    onClose={() => setIsMenuOpen(false)}
                >
                    {flyoutChild.props.children}
                </DropDownMenuFlyout>
            )}
        </>
    );
};

DropDownButton.Flyout = DropDownMenuFlyout;
export default DropDownButton;