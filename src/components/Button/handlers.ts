import { Ref, useImperativeHandle, RefObject, MouseEvent, KeyboardEvent } from 'react';
import { debounce } from '../../utils/debounce';

const DEBOUNCE_TIME = 50;

const triggerAction = (
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void,
    event?: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
) => {
    if (onClick) {
        onClick(event as MouseEvent<HTMLButtonElement>);
    }
};

export const useClickTriggerHandle = debounce((
    event: MouseEvent<HTMLButtonElement>,
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void
) => {
    triggerAction(onClick, event);
}, DEBOUNCE_TIME);

export const useKeyTriggerHandle = debounce((
    event: KeyboardEvent<HTMLButtonElement>,
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void,
    disabled?: boolean
) => {
    if ((event.key === 'Enter' || event.key === ' ') && !disabled) {
        event.preventDefault();
        triggerAction(onClick, event);
    }
}, DEBOUNCE_TIME);

export const useImperativeButtonHandle = (
    ref: Ref<{ click: () => void }>,
    buttonRef: RefObject<HTMLButtonElement>,
    disabled?: boolean
) => {
    useImperativeHandle(ref, () => ({
        click: () => {
            if (buttonRef.current && !disabled) {
                buttonRef.current.click();
            }
        },
    }));
};