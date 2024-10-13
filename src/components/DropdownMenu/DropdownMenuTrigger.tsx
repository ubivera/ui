/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Ubivera. All rights reserved.
 *  Licensed under the MIT License. See LICENSE.md in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React, { useState, useContext, cloneElement, ReactElement, useEffect } from 'react';
import { DropdownContext } from './DropdownMenu';
import classNames from 'classnames';

type DropdownMenuTriggerProps = React.HTMLAttributes<HTMLDivElement> & {
    asChild?: boolean;
    defaultText: string;
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
const DropdownMenuTrigger: React.FC<DropdownMenuTriggerProps> = ({ asChild = false, defaultText, children, ...props }) => {
    const context = useContext(DropdownContext);
    const [triggerText, setTriggerText] = useState(defaultText);
    const [data, setData] = useState<string | null>(null);
    const [showReset, setShowReset] = useState(false);

    if (!context) {
        throw new Error('DropdownTrigger must be used within a DropdownMenu');
    }

    const { isOpen, isClosing, toggleDropdown, triggerRef, contentRef } = context;

    const resetTrigger = () => {
        setTriggerText(defaultText);
        setData(null);
        setShowReset(false);
    };

    const handleClick = (event: React.MouseEvent) => {
        event.preventDefault();
        toggleDropdown();
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggleDropdown();
        }
    };

    useEffect(() => {
        if (isOpen && contentRef.current) {
            const firstInteractiveElement = contentRef.current.querySelector<HTMLElement>(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            
            firstInteractiveElement?.focus();
        }
    }, [isOpen]);

    const isActive = isOpen && !isClosing;

    if (asChild && React.isValidElement(children)) {
        return cloneElement(children as ReactElement, {
            role: 'button',
            'aria-haspopup': 'true',
            'aria-expanded': isOpen,
            className: classNames(children.props.className, { active: isActive }),
            onKeyDown: handleKeyDown,
            onClick: handleClick,
            ref: triggerRef,
            tabIndex: 0,
            ...props,
            'data-trigger': data
        });
    }

    return (
        <div className="dropdown-trigger-wrapper" style={{ display: 'flex', alignItems: 'center' }}>
            <div
                role='button'
                aria-haspopup='true'
                aria-expanded={isOpen}
                className={classNames('dropdown-menu-trigger', { 'active': isActive })}
                onKeyDown={handleKeyDown}
                onClick={handleClick}
                ref={triggerRef as React.RefObject<HTMLDivElement>}
                tabIndex={0}
                {...props}
                data-trigger={data}
            >
                {triggerText}
            </div>

            {showReset && (
                <button
                    type="button"
                    className="reset-button"
                    onClick={resetTrigger}
                    style={{ marginLeft: '10px' }}
                >
                    Reset
                </button>
            )}
        </div>
    );
};

export default DropdownMenuTrigger;