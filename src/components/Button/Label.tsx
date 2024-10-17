import React, { useRef, useImperativeHandle, useEffect, forwardRef } from 'react';
import { LabelProps } from './types';

export interface LabelRef {
    getText: () => string;
    setText: (newText: string) => void;
}

export const Label = forwardRef<LabelRef, LabelProps>(({ text = '', inheritLabel = false }, ref) => {
    const labelRef = useRef<string>(text);

    useImperativeHandle(ref, () => ({
        getText: () => labelRef.current,
        setText: (newText: string) => {
            labelRef.current = newText;
        },
    }));

    useEffect(() => {
        if (inheritLabel) {
            labelRef.current = text;
        }
    }, [text, inheritLabel]);

    return <span className="btn-label">{labelRef.current}</span>;
});