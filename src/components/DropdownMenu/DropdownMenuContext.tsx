/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Ubivera. All rights reserved.
 *  Licensed under the MIT License. See LICENSE.md in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React, { useContext, useEffect, useRef } from 'react';
import { DropdownContext } from './DropdownMenu';

const DropdownMenuContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
    const context = useContext(DropdownContext);

    if (!context) {
        throw new Error('DropdownMenuContent must be used within a DropdownMenu');
    }

    const { isOpen, closeDropdown } = context;
    const contentRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (contentRef.current && !contentRef.current.contains(event.target as Node)) {
                closeDropdown();
            }
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
        <div ref={contentRef} {...props}>
            {children}
        </div>
    );
};

export default DropdownMenuContent;