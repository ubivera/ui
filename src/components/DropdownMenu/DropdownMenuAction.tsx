/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Ubivera. All rights reserved.
 *  Licensed under the MIT License. See LICENSE.md in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';

/**
 * Props for the DropdownMenuAction component.
 *
 * @typedef {Object} DropdownMenuActionProps
 * @property {string} label - The text to be displayed inside the action button.
 * @property {() => void} onAction - Callback function to be executed when the button is clicked.
 * @property {React.ButtonHTMLAttributes<HTMLButtonElement>} [props] - Additional button attributes from React's ButtonHTMLAttributes.
 */
interface DropdownMenuActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    onAction: () => void;
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
const DropdownMenuAction: React.FC<DropdownMenuActionProps> = ({ label, onAction, ...props }) => {
    return (
        <button className="dropdown-menu-action" onClick={onAction} {...props}>
            {label}
        </button>
    );
};

export default DropdownMenuAction;