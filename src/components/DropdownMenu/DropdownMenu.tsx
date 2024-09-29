/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Ubivera. All rights reserved.
 *  Licensed under the MIT License. See LICENSE.md in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React, { createContext, useState, useCallback, useRef } from 'react';

/**
 * DropdownContext
 *
 * This context holds the open/close state of the dropdown and provides functions to toggle
 * or close the dropdown. It is shared between the `DropdownTrigger` and `DropdownMenuContent`
 * components to control the dropdown's behavior.
 *
 * @context
 * @example
 * ```tsx
 * const { isOpen, toggleDropdown, closeDropdown } = useContext(DropdownContext);
 * ```
 *
 * @interface {object} DropdownContextType
 * @property {boolean} isOpen - Indicates whether the dropdown is currently open.
 * @property {() => void} toggleDropdown - Function to toggle the dropdown's visibility.
 * @property {() => void} closeDropdown - Function to close the dropdown.
 * @property {HTMLElement} triggerRef - A reference to the dropdown menu's trigger component.
 */
interface DropdownContextType {
    isOpen: boolean;
    toggleDropdown: () => void;
    closeDropdown: () => void;
    triggerRef: React.RefObject<HTMLElement>;
};

export const DropdownContext = createContext<DropdownContextType | undefined>(undefined);

type DropdownMenuProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * DropdownMenu Component
 *
 * This component serves as the provider for the dropdown's state and behavior. It manages
 * the open/close state of the dropdown and makes it available to the `DropdownTrigger` and
 * `DropdownMenuContent` components via context. It also renders its children within a `div`.
 *
 * @component
 * @example
 * ```tsx
 * <DropdownMenu>
 *   <DropdownTrigger>
 *     <button>Open Dropdown</button>
 *   </DropdownTrigger>
 *   <DropdownMenuContent>
 *     <p>Menu Content</p>
 *   </DropdownMenuContent>
 * </DropdownMenu>
 * ```
 *
 * @param {DropdownMenuProps} props - The props for the DropdownMenu component.
 * @param {React.ReactNode} props.children - The children components, typically `DropdownTrigger` and `DropdownMenuContent`.
 * @param {React.HTMLAttributes<HTMLDivElement>} props - The default HTML props for the menu container.
 *
 * @returns {JSX.Element} A context provider component for the dropdown menu.
 */
const DropdownMenu: React.FC<DropdownMenuProps> = ({ children, ...props }) => {
    const [isOpen, setIsOpen] = useState(false);
    const triggerRef = useRef<HTMLElement>(null);

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
        triggerRef,
    };

    return (
        <DropdownContext.Provider value={value}>
            <div className='dropdown-menu' {...props}>{children}</div>
        </DropdownContext.Provider>
    );
};

export default DropdownMenu;