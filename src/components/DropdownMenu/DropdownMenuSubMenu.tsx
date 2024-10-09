/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Ubivera. All rights reserved.
 *  Licensed under the MIT License. See LICENSE.md in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React, { useState, useContext, useRef, useEffect } from 'react';
import { DropdownContext } from './DropdownMenu';

interface DropdownMenuSubMenuProps {
    label: string;
    children: React.ReactNode;
}

const DropdownMenuSubMenu: React.FC<DropdownMenuSubMenuProps> = ({ label, children }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isRightAligned, setIsRightAligned] = useState(true);
    const submenuRef = useRef<HTMLDivElement>(null);
    const context = useContext(DropdownContext);

    if (!context) {
        throw new Error('DropdownMenuSubMenu must be used within a DropdownMenu');
    }

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    useEffect(() => {
        const handlePositioning = () => {
            if (submenuRef.current) {
            const submenuRect = submenuRef.current.getBoundingClientRect();
            const viewportWidth = window.innerWidth;

                if (submenuRect.right > viewportWidth) {
                    setIsRightAligned(false);
                } else {
                    setIsRightAligned(true);
                }
            }
        };

        if (isHovered) {
            handlePositioning();
        }

        window.addEventListener('resize', handlePositioning);
        return () => window.removeEventListener('resize', handlePositioning);
    }, [isHovered]);

    return (
        <div
            className="dropdown-menu-submenu-wrapper"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="dropdown-menu-submenu-label">{label}</div>

            {isHovered && (
            <div
                ref={submenuRef}
                className={`dropdown-menu-submenu ${isRightAligned ? 'align-right' : 'align-left'}`}
            >
                <div className="dropdown-menu-submenu-items">
                    {children}
                </div>
            </div>
            )}
        </div>
    );
};

export default DropdownMenuSubMenu;