import React, {useContext} from 'react';
import {MenuFlyoutContext} from './MenuFlyoutContext';

export interface MenuFlyoutItemProps {
    Text?: string;
    Click?: () => void;
    Disabled?: boolean;
    AutoClose?: boolean;
    children?: React.ReactNode;
}

const MenuFlyoutItem: React.FC<MenuFlyoutItemProps> = ({
                                                           Text,
                                                           Click,
                                                           Disabled = false,
                                                           AutoClose = true,
                                                           children,
                                                       }) => {
    const context = useContext(MenuFlyoutContext);
    const closeFlyout = context?.closeFlyout;

    const handleClick = () => {
        if (Disabled) return;

        Click && Click();

        if (AutoClose && closeFlyout) {
            closeFlyout();
        }
    };

    return (
        <div
            className={`menu-flyout-item${Disabled ? ' disabled' : ''}`}
            role="menuitem"
            tabIndex={Disabled ? -1 : 0}
            onClick={handleClick}
            onKeyDown={(e) => {
                if (Disabled) return;

                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    Click && Click();

                    if (AutoClose && closeFlyout) {
                        closeFlyout();
                    }
                }
            }}
        >
            {children || Text}
        </div>
    );
};

MenuFlyoutItem.displayName = 'MenuFlyoutItem';
export default MenuFlyoutItem;