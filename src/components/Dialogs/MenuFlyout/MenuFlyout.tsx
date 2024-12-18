import React, {ReactNode, useEffect, useRef} from 'react';
import {ensureElementVisibility} from '../../../utils';
import './MenuFlyout.scss';

export interface MenuFlyoutProps {
    children: ReactNode;
    Placement?: 'Bottom' | 'Top' | 'Left' | 'Right';
}

const MenuFlyout: React.FC<MenuFlyoutProps> = ({children, Placement = 'Bottom'}) => {
    const flyoutRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const flyout = flyoutRef.current;

        if (flyout) {
            ensureElementVisibility(flyout, -10);
        }
    }, []);

    return (
        <div
            ref={flyoutRef}
            className={`menu-flyout placement-${Placement.toLowerCase()}`}
            role="menu"
        >
            {children}
        </div>
    );
};

MenuFlyout.displayName = 'MenuFlyout';
export default MenuFlyout;