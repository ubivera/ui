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

/**
 * DropdownMenuSubMenu Component
 *
 * This component renders a submenu inside a dropdown. The submenu appears when the user hovers over the label.
 * It dynamically adjusts its position to either the left or the right, depending on available space.
 * 
 * The submenu remains aligned to the right by default but switches to the left if there isn't enough space on the right side of the viewport.
 * The alignment is recalculated on window resize.
 *
 * ### Example Usage:
 * ```tsx
 * <DropdownMenuSubMenu label="More Options">
 *   <DropdownMenuAction label="Action 1" onAction={handleAction1} />
 *   <DropdownMenuAction label="Action 2" onAction={handleAction2} />
 * </DropdownMenuSubMenu>
 * ```
 *
 * @component
 * 
 * @param {DropdownMenuSubMenuProps} props - The props for the DropdownMenuSubMenu component.
 * @param {string} props.label - The label for the submenu trigger, which is displayed as text the user hovers over.
 * @param {React.ReactNode} props.children - The content to be displayed inside the submenu when it opens, typically a list of actions.
 *
 * @returns {JSX.Element} A submenu component that shows child elements when hovered and adjusts its alignment based on available screen space.
 */
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