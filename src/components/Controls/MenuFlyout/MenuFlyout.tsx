import React, { ReactNode } from 'react';
import { Flyout } from '../../Dialogs/Flyout';

interface MenuFlyoutProps {
    IsOpen?: boolean;
    Target?: React.RefObject<HTMLElement>;
    Placement?: any;
    AreOpenCloseAnimationsEnabled?: boolean;
    AllowFocusOnInteraction?: boolean;
    children?: ReactNode;
}

const MenuFlyout: React.FC<MenuFlyoutProps> = (props) => {
    return (
        <Flyout {...props}>
            <div className="menu-flyout-content">
                {props.children}
            </div>
        </Flyout>
    );
};

export default MenuFlyout;