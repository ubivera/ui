/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Ubivera. All rights reserved.
 *  Licensed under the MIT License. See LICENSE.md in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';

/**
 * DropdownMenuSeparator Component
 *
 * This component renders a horizontal rule (`<hr>`) to visually separate items in a dropdown menu.
 * It provides a clear division between different sections of the dropdown, improving the user interface structure.
 *
 * @example
 * ```tsx
 * <DropdownMenu>
 *   <DropdownMenuAction label="Action 1" onAction={handleAction1} />
 *   <DropdownMenuSeparator />
 *   <DropdownMenuAction label="Action 2" onAction={handleAction2} />
 * </DropdownMenu>
 * ```
 *
 * @component
 *
 * @returns {JSX.Element} A horizontal rule (`<hr>`) that serves as a visual separator in the dropdown menu.
 */
const DropdownMenuSeparator: React.FC = () => {
    return <hr className="dropdown-menu-separator" />;
};

export default DropdownMenuSeparator;