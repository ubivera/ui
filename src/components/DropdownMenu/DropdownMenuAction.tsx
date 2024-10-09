/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Ubivera. All rights reserved.
 *  Licensed under the MIT License. See LICENSE.md in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';

interface DropdownMenuActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    onAction: () => void;
}

const DropdownMenuAction: React.FC<DropdownMenuActionProps> = ({ label, onAction, ...props }) => {
    return (
        <button className="dropdown-menu-action" onClick={onAction} {...props}>
            {label}
        </button>
    );
};

export default DropdownMenuAction;
