import { Ref, useImperativeHandle, RefObject } from 'react';

export const useImperativeButtonHandle = (
    ref: Ref<{ click: () => void }>,
    buttonRef: RefObject<HTMLButtonElement>,
    disabled: boolean
) => {
    useImperativeHandle(ref, () => ({
        click: () => {
            if (buttonRef.current && !disabled) {
                buttonRef.current.click();
            }
        },
    }));
};