/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Ubivera. All rights reserved.
 *  Licensed under the MIT License. See LICENSE.md in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * This module defines a `ButtonLogic` class that encapsulates the behavior of an HTML button element,
 * allowing for a modular, reusable, and easily maintainable codebase. The `ButtonLogic` class provides
 * methods to manage click event handling and ensures that the button's lifecycle is properly managed.
 * 
 * @see [Wiki](https://github.com/ubivera/ui/wiki/Button)
 */
export class ButtonLogic {
    private element: HTMLButtonElement;
    private handler: ((event: MouseEvent) => void) | null = null;

    constructor(element: HTMLButtonElement) {
        if (!(element instanceof HTMLButtonElement)) {
            throw new Error('The provided element is not a valid HTMLButtonElement.');
        }

        this.element = element;
        this.handleClick = this.handleClick.bind(this);
        this.element.addEventListener('click', this.handleClick);
    }

    private handleClick(event: MouseEvent): void {
        if (this.handler) {
            this.handler(event);
        }
    }

    public setOnClickHandler(handler: (event: MouseEvent) => void): void {
        this.handler = handler;
    }

    public removeOnClickHandler(): void {
        this.handler = null;
    }

    public destroy(): void {
        this.element?.removeEventListener('click', this.handleClick);

        if (this.element?.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }

        this.element = null!;
    }
}

export default ButtonLogic;