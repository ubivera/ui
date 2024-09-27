/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Ubivera. All rights reserved.
 *  Licensed under the MIT License. See LICENSE.md in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React, { createContext, useState, useCallback } from 'react';

const DropdownContext = createContext({
    isOpen: false,
    toggleDropdown: () => {},
    closeDropdown: () => {}
});

type DropdownMenuProps = React.HTMLAttributes<HTMLDivElement>;

const DropdownMenu: React.FC<DropdownMenuProps> = ({ children, ...props }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);

    const closeDropdown = useCallback(() => {
        setIsOpen(false);
    }, []);

    const value = {
        isOpen,
        toggleDropdown,
        closeDropdown,
    };

    return (
        <DropdownContext.Provider value={value}>
            <div {...props}>{children}</div>
        </DropdownContext.Provider>
    );
};

export default DropdownMenu;