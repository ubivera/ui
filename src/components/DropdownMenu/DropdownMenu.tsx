/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Ubivera. All rights reserved.
 *  Licensed under the MIT License. See LICENSE.md in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React, { createContext, useState, useCallback, useRef } from 'react';
import './DropdownMenu.scss';

interface DropdownMenuProps extends React.HTMLAttributes<HTMLDivElement> {
    isOpen?: boolean;
    onToggle?: (isOpen: boolean) => void;
    placeAbove?: boolean;
}

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
 * @property {boolean} isClosing - Indicates whether the dropdown is currently closing.
 * @property {() => void} toggleDropdown - Function to toggle the dropdown's visibility.
 * @property {() => void} closeDropdown - Function to close the dropdown.
 * @property {HTMLElement} triggerRef - A reference to the dropdown menu's trigger component.
 * @property {HTMLElement} contentRef - A reference to the drop down menu's content component.
 */
interface DropdownContextType {
    isOpen: boolean;
    isClosing: boolean;
    toggleDropdown: () => void;
    closeDropdown: () => void;
    triggerRef: React.RefObject<HTMLElement>;
    contentRef: React.RefObject<HTMLElement>;
};

export const DropdownContext = createContext<DropdownContextType | undefined>(undefined);

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
const DropdownMenu: React.FC<DropdownMenuProps> = ({ children, isOpen: externalIsOpen, onToggle, placeAbove = false, ...props }) => {
    const [internalIsOpen, setInternalIsOpen] = useState(false);
    const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
    const [isClosing, setIsClosing] = useState(false);
    const triggerRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLElement>(null);

    const closeDropdown = useCallback(() => {
        setIsClosing(true);

        if (contentRef.current) {
            contentRef.current.classList.remove('drop-in');
            contentRef.current.classList.add('drop-out');
        }

        setTimeout(() => {
            setInternalIsOpen(false);
            setIsClosing(false);
        }, 100);
    }, []);

    const toggleDropdown = useCallback(() => {
        if (externalIsOpen !== undefined && onToggle) {
            onToggle(!isOpen);
            closeDropdown();
        } else {
            setInternalIsOpen(!isOpen);

            setTimeout(() => {
                if (triggerRef.current && contentRef.current) {
                    const triggerRect = triggerRef.current.getBoundingClientRect();
                    const contentRect = contentRef.current.getBoundingClientRect();
                    const viewportWidth = window.innerWidth;

                    let top = placeAbove 
                        ? - contentRect.height - 20
                        : triggerRect.height + 10;
                    let left = triggerRect.left - 10;

                    if (triggerRect.left + contentRect.width > viewportWidth) {
                        left = viewportWidth - contentRect.width - 10;
                    }

                    contentRef.current.style.top = `${top}px`;
                    contentRef.current.style.left = `${left}px`;
                }
            }, 0);
        }
    }, [isOpen, placeAbove, closeDropdown]);

    const value = {
        isOpen,
        isClosing,
        toggleDropdown,
        closeDropdown,
        triggerRef,
        contentRef
    };

    return (
        <DropdownContext.Provider value={value}>
            <div className='dropdown-menu' {...props}>
                {children}
            </div>
        </DropdownContext.Provider>
    );
};

export default DropdownMenu;