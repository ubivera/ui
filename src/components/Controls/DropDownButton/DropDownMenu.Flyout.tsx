import React, { useEffect, useState } from 'react';
import MenuFlyout from '../MenuFlyout/MenuFlyout';

const DropDownMenuFlyout: React.FC<{
    Target?: React.RefObject<HTMLElement>;
    onClose?: () => void;
    children?: React.ReactNode;
}> = ({ Target, onClose, children }) => {
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (Target?.current && !Target.current.contains(event.target as Node) && onClose) {
                setIsOpen(false);
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [Target, onClose]);

    return (
        <MenuFlyout
            IsOpen={isOpen}
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