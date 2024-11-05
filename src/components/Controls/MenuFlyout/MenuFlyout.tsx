import React from 'react';
import { Flyout } from '../../Dialogs/Flyout';
import './MenuFlyout.scss';

interface MenuFlyoutProps {
    IsOpen?: boolean;
    Target?: React.RefObject<HTMLElement>;
    Placement?: any;
    AreOpenCloseAnimationsEnabled?: boolean;
    AllowFocusOnInteraction?: boolean;
    children?: React.ReactNode;
}

const MenuFlyout: React.FC<MenuFlyoutProps> = ({
    IsOpen = false,
    Target,
    Placement,
    AreOpenCloseAnimationsEnabled = true,
    AllowFocusOnInteraction = true,
    children,
}) => {
    return (
        <Flyout
            IsOpen={IsOpen}
            Target={Target}
            Placement={Placement}
            AreOpenCloseAnimationsEnabled={AreOpenCloseAnimationsEnabled}
            AllowFocusOnInteraction={AllowFocusOnInteraction}
        >
            <div className="menu-flyout-content">
                {children}
            </div>
        </Flyout>
    );
};

export default MenuFlyout;