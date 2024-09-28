/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Ubivera. All rights reserved.
 *  Licensed under the MIT License. See LICENSE.md in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React, { useContext, useEffect, useRef } from 'react';
import { DropdownContext } from './DropdownMenu';

/**
 * DropdownMenuContent Component
 *
 * This component displays the content of the dropdown menu when it is open. It renders its children
 * based on the dropdown's state (`isOpen`), which is controlled by the `DropdownTrigger`. It also
 * listens for outside clicks to automatically close the dropdown if the user clicks outside the menu.
 *
 * @component
 * @example
 * ```tsx
 * <DropdownMenuContent>
 *   <ul>
 *     <li>Option 1</li>
 *     <li>Option 2</li>
 *   </ul>
 * </DropdownMenuContent>
 * ```
 *
 * @param {React.HTMLAttributes<HTMLDivElement>} props - The default HTML props for the menu content container.
 * @param {React.ReactNode} props.children - The content to be displayed inside the dropdown.
 *
 * @returns {JSX.Element | null} The dropdown content if the menu is open, or null if it's closed.
 */
const DropdownMenuContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
    const context = useContext(DropdownContext);

    if (!context) {
        throw new Error('DropdownMenuContent must be used within a DropdownMenu');
    }

    const { isOpen, closeDropdown } = context;
    const contentRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (contentRef.current && contentRef.current.contains(event.target as Node)) {
                return;
            }

            if (triggerRef.current && triggerRef.current.contains(event.target as Node)) {
                return;
            }

            closeDropdown();
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, closeDropdown]);

    if (!isOpen) {
        return null;
    }

    return (
        <div className='dropdown-menu-content' ref={contentRef} {...props}>
            {children}
        </div>
    );
};

export default DropdownMenuContent;