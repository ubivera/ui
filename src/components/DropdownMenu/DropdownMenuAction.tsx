/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Ubivera. All rights reserved.
 *  Licensed under the MIT License. See LICENSE.md in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React, { useContext } from 'react';
import { DropdownContext } from './DropdownMenu';

/**
 * Props for the DropdownMenuAction component.
 *
 * @typedef {Object} DropdownMenuActionProps
 * @property {() => void} onAction - Callback function to be executed when the button is clicked.
 * @property {React.ReactNode} [startIcon] - Icon element to be displayed on the left side of the button.
 * @property {React.ReactNode} [endIcon] - Icon element to be displayed on the right side of the button.
 * @property {React.ButtonHTMLAttributes<HTMLButtonElement>} [props] - Additional button attributes from React's ButtonHTMLAttributes.
 * @property {boolean} autoClose - Should the button automatically close the dropdown menu when clicked. Defaults to true.
 */
interface DropdownMenuActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    onAction: () => void;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    autoClose?: boolean;
}

/**
 * DropdownMenuAction Component
 *
 * This component renders a button inside a dropdown menu, which triggers an action when clicked.
 * It is typically used for actions within a dropdown menu that require user interaction.
 * 
 * @example
 * ```tsx
 * <DropdownMenuAction
 *   label="Save"
 *   onAction={() => console.log('Action performed')}
 * />
 * ```
 *
 * @component
 * @param {DropdownMenuActionProps} props - The props for the DropdownMenuAction component.
 * @param {string} props.label - The text that will be displayed inside the button.
 * @param {() => void} props.onAction - The function that will be called when the button is clicked.
 * @param {React.ButtonHTMLAttributes<HTMLButtonElement>} [props] - Any additional attributes supported by a native button element.
 *
 * @returns {JSX.Element} A button component for actions within the dropdown menu.
 */
const DropdownMenuAction: React.FC<DropdownMenuActionProps> = ({ onAction, autoClose = true, startIcon, endIcon, children, ...props }) => {
    const { closeDropdown } = useContext(DropdownContext) || {};
    
    const handleClick = () => {
        onAction();

        if (autoClose && closeDropdown) {
            closeDropdown();
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleClick();
        }
    };
    
    return (
        <button className='dropdown-menu-action'
            onKeyDown={handleKeyDown}
            onClick={handleClick} 
            role='menuitem'
            tabIndex={0}
            {...props}
        >
            <div className="dropdown-menu-action-content">
                { (startIcon || endIcon) && <span className="dropdown-menu-action-icon left">{startIcon}</span>}
                <span className="dropdown-menu-action-label">{children}</span>
                { (startIcon || endIcon) && <span className="dropdown-menu-action-icon right">{endIcon}</span>}
            </div>
        </button>
    );
};

export default DropdownMenuAction;