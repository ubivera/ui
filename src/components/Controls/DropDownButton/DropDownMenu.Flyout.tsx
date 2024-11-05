import React, { useEffect } from 'react';
import MenuFlyout from '../MenuFlyout/MenuFlyout';

const DropDownMenuFlyout: React.FC<{
    Target?: React.RefObject<HTMLElement>;
    onClose?: () => void;
    children?: React.ReactNode;
}> = ({ Target, onClose, children }) => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (Target?.current && !Target.current.contains(event.target as Node) && onClose) onClose();
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [Target, onClose]);

    return (
        <MenuFlyout
            IsOpen={true}
            Target={Target}
            Placement="Bottom"
            AllowFocusOnInteraction={true}
            AreOpenCloseAnimationsEnabled={true}
        >
            {children}
        </MenuFlyout>
    );
};

export default DropDownMenuFlyout;