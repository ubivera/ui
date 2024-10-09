/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Ubivera. All rights reserved.
 *  Licensed under the MIT License. See LICENSE.md in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React, { useContext, cloneElement, ReactElement } from 'react';
import { DropdownContext } from './DropdownMenu';
import classNames from 'classnames';

type DropdownMenuTriggerProps = React.HTMLAttributes<HTMLDivElement> & {
    asChild?: boolean;
};

/**
 * DropdownMenuTrigger Component
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
 *   <DropdownMenuTrigger asChild>
 *     <Button>Open Dropdown</Button>
 *   </DropdownMenuTrigger>
 *   <DropdownMenuContent>
 *     <p>Menu Content</p>
 *   </DropdownMenuContent>
 * </DropdownMenu>
 * ```
 *
 * @param {DropdownTriggerProps} props - The props for the DropdownMenuTrigger component.
 * @param {boolean} [props.asChild=false] - If true, renders the child directly without a wrapping element.
 * @param {React.ReactNode} props.children - The child element that serves as the clickable trigger.
 * @param {React.HTMLAttributes<HTMLDivElement>} props - The default HTML props for the trigger container (if applicable).
 *
 * @returns {JSX.Element} A clickable component that toggles the dropdown menu.
 */
const DropdownMenuTrigger: React.FC<DropdownMenuTriggerProps> = ({ children, asChild = false, ...props }) => {
    const context = useContext(DropdownContext);

    if (!context) {
        throw new Error('DropdownTrigger must be used within a DropdownMenu');
    }

    const { isOpen, isClosing, toggleDropdown, triggerRef } = context;

    const handleClick = (event: React.MouseEvent) => {
        event.preventDefault();
        toggleDropdown();
    };

    const isActive = isOpen && !isClosing;

    if (asChild && React.isValidElement(children)) {
        return cloneElement(children as ReactElement, {
            ref: triggerRef,
            className: classNames(children.props.className, { active: isActive }),
            onClick: handleClick,
            ...props,
        });
    }

    return (
        <div
            className={classNames('dropdown-menu-trigger', { 'active': isActive })}
            onClick={handleClick} 
            ref={triggerRef as React.RefObject<HTMLDivElement>} {...props}
        >
            {children}
        </div>
    );
};

export default DropdownMenuTrigger;