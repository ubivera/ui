/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Ubivera. All rights reserved.
 *  Licensed under the MIT License. See LICENSE.md in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React, { useContext, cloneElement, ReactElement } from 'react';
import { DropdownContext } from './DropdownMenu';

type DropdownTriggerProps = React.HTMLAttributes<HTMLDivElement> & {
    asChild?: boolean;
};

/**
 * DropdownTrigger Component
 *
 * This component acts as the clickable element that toggles the visibility of the dropdown menu.
 * It can either render its child element directly (using the `asChild` prop) or wrap it inside
 * a `div` element. When clicked, it toggles the dropdown's visibility by using the context
 * provided by `DropdownMenu`.
 *
 * @component
 * @example
 * ```tsx
 * <DropdownMenu>
 *   <DropdownTrigger asChild>
 *     <button>Open Dropdown</button>
 *   </DropdownTrigger>
 *   <DropdownMenuContent>
 *     <p>Menu Content</p>
 *   </DropdownMenuContent>
 * </DropdownMenu>
 * ```
 *
 * @param {DropdownTriggerProps} props - The props for the DropdownTrigger component.
 * @param {boolean} [props.asChild=false] - If true, renders the child directly without a wrapping element.
 * @param {React.ReactNode} props.children - The child element that serves as the clickable trigger.
 * @param {React.HTMLAttributes<HTMLDivElement>} props - The default HTML props for the trigger container (if applicable).
 *
 * @returns {JSX.Element} A clickable component that toggles the dropdown menu.
 */
const DropdownTrigger: React.FC<DropdownTriggerProps> = ({ children, asChild = false, ...props }) => {
    const context = useContext(DropdownContext);

    if (!context) {
        throw new Error('DropdownTrigger must be used within a DropdownMenu');
    }

    const { isOpen, toggleDropdown, closeDropdown } = context;

    const handleClick = (event: React.MouseEvent) => {
        event.preventDefault();
        
        if (isOpen) {
            closeDropdown();
            console.log('Attempted to close.');
        } else {
            toggleDropdown();
            console.log('Toggled instead');
        }
    };

    if (asChild && React.isValidElement(children)) {
        return cloneElement(children as ReactElement, {
            onClick: handleClick,
            ...props,
        });
    }

    return (
        <div className='dropdown-menu-trigger' onClick={handleClick} {...props}>
            {children}
        </div>
    );
};

export default DropdownTrigger;