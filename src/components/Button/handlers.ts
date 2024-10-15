import { MouseEvent, KeyboardEvent } from 'react';

const executeOnClick = (
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void,
    event?: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
) => {
    if (onClick) {
        onClick(event as MouseEvent<HTMLButtonElement>);
    }
};

export const handleClick = (
    event: MouseEvent<HTMLButtonElement>,
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void
) => {
    executeOnClick(onClick, event);
};

export const handleKeyPress = (
    event: KeyboardEvent<HTMLButtonElement>,
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void,
    disabled?: boolean
) => {
    if ((event.key === 'Enter' || event.key === ' ') && !disabled) {
        event.preventDefault();
        executeOnClick(onClick, event);
    }
};