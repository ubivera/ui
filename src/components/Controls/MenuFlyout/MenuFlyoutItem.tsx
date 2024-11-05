import React from 'react';

interface MenuFlyoutItemProps {
    Text?: string;
    Action?: () => void;
    children?: React.ReactNode;
}

const MenuFlyoutItem: React.FC<MenuFlyoutItemProps> = ({ Text, Action, children }) => {
    const handleClick = () => {
        if (Action) Action();
    };

    return (
        <div
            className="menu-flyout-item"
            role="menuitem"
            aria-label={children ? Text : undefined}
            onClick={handleClick}
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    handleClick();
                    e.preventDefault();
                }
            }}
        >
            {children || Text}
        </div>
    );
};

export default MenuFlyoutItem;