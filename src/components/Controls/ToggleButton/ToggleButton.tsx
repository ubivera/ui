import React, { useState, forwardRef, useImperativeHandle } from 'react';
import Button, { ButtonProps } from '../Button/Button';
import './ToggleButton.scss';

export interface ToggleButtonProps extends ButtonProps {
    IsChecked?: boolean | null;
    IsThreeState?: boolean;
    Checked?: () => void;
    Unchecked?: () => void;
    Indeterminate?: () => void;
}

export interface ToggleButtonRef {
    SetChecked: (value: boolean | null) => void;
    GetChecked: () => boolean | null;
}

const ToggleButton = forwardRef<ToggleButtonRef, ToggleButtonProps>(
    (
        {
            IsChecked = false,
            IsThreeState = false,
            Checked,
            Unchecked,
            Indeterminate,
            Content,
            Classes,
            AriaPressed,
            ...props
        },
        ref
    ) => {
        const [checkedState, setCheckedState] = useState<boolean | null>(IsChecked);

        useImperativeHandle(ref, () => ({
            SetChecked: (value: boolean | null) => {
                const newState = IsThreeState ? value : value === null ? false : value;
                setCheckedState(newState);
                triggerCallback(newState);
            },
            GetChecked: () => checkedState,
        }));

        const triggerCallback = (state: boolean | null) => {
            if (state === true && Checked) Checked();
            else if (state === false && Unchecked) Unchecked();
            else if (state === null && Indeterminate) Indeterminate();
        };

        const handleClick = () => {
            const newState = checkedState !== true; // Cycle between true and false
            setCheckedState(newState);
            triggerCallback(newState);
        };

        return (
            <Button
                {...props}
                Click={handleClick}
                Content={Content}
                Style={`toggle ${props.Style || ''}`.trim()}
                AriaChecked={checkedState === null ? 'mixed' : checkedState}
            />
        );
    }
);

ToggleButton.displayName = 'ToggleButton';

export default ToggleButton;