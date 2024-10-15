import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import { LabelProps } from './types';

export interface LabelRef {
    getText: () => string;
    setText: (newText: string) => void;
}

export const Label = forwardRef<LabelRef, LabelProps>(({ text }, ref) => {
    const labelRef = useRef<string>(text);

    useImperativeHandle(ref, () => ({
        getText: () => labelRef.current,
        setText: (newText: string) => {
            labelRef.current = newText;
        },
    }));

    return <span className="btn-label">{labelRef.current}</span>;
});