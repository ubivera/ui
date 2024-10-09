/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Ubivera. All rights reserved.
 *  Licensed under the MIT License. See LICENSE.md in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React, { useContext, useEffect, useState } from 'react';
import { DropdownContext } from './DropdownMenu';
import classNames from 'classnames';

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
    const [isClosing] = useState(false);
  
    if (!context) {
        throw new Error('DropdownMenuContent must be used within a DropdownMenu');
    }
  
    const { isOpen, closeDropdown, triggerRef, contentRef } = context;
  
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
    
            if (contentRef.current?.contains(target) || triggerRef.current?.contains(target)) {
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
  
    if (!isOpen && !isClosing) {
        return null;
    }
  
    return (
        <div
            className={classNames('dropdown-menu-content', { 'drop-in': !isClosing })}
            ref={contentRef as React.RefObject<HTMLDivElement>}
            {...props}
        >
            {children}
        </div>
    );
};

export default DropdownMenuContent;