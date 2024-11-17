import React, { ReactNode } from 'react';
import './MenuFlyout.scss';

export interface MenuFlyoutProps {
    children: ReactNode;
    Placement?: 'Bottom' | 'Top' | 'Left' | 'Right';
}

const MenuFlyout: React.FC<MenuFlyoutProps> = ({ children, Placement = 'Bottom' }) => {
    return (
        <div className={`flyout plc-${Placement.toLowerCase()}`} role="menu">
            {children}
        </div>
    );
};

MenuFlyout.displayName = 'MenuFlyout';
export default MenuFlyout;