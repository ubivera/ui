/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Ubivera. All rights reserved.
 *  Licensed under the MIT License. See LICENSE.md in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React, { useContext, cloneElement, ReactElement } from 'react';
import { DropdownContext } from './DropdownMenu';

type DropdownTriggerProps = React.HTMLAttributes<HTMLDivElement> & {
    asChild?: boolean;
};

const DropdownTrigger: React.FC<DropdownTriggerProps> = ({ children, asChild = false, ...props }) => {
    const context = useContext(DropdownContext);

    if (!context) {
        throw new Error('DropdownTrigger must be used within a DropdownMenu');
    }

    const { toggleDropdown } = context;

    if (asChild && React.isValidElement(children)) {
        return cloneElement(children as ReactElement, {
            onClick: toggleDropdown,
            ...props,
        });
    }

    return (
        <div onClick={toggleDropdown} {...props}>
            {children}
        </div>
    );
};

export default DropdownTrigger;