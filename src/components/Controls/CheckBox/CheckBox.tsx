import React, {useState, useRef, useImperativeHandle, forwardRef, useCallback, ReactNode, useEffect} from 'react';
import CheckBoxContent from './CheckBox.Content';
import './CheckBox.scss';

export interface CheckBoxProps {
    Name?: string;
    Content?: ReactNode;
    IsThreeState?: boolean;
    Checked?: () => void;
    Unchecked?: () => void;
    Indeterminate?: () => void;
    IsChecked?: boolean | null;
    Classes?: React.CSSProperties;
    children?: ReactNode;
}

export interface CheckBoxRef {
    SetChecked: (value: boolean | null) => void;
    GetChecked: () => boolean | null;
    FocusCheckBox: () => void;
}

type CheckBoxComponent = React.MemoExoticComponent<
    React.ForwardRefExoticComponent<
        CheckBoxProps & React.RefAttributes<CheckBoxRef>
    >
> & {
    Content: typeof CheckBoxContent;
};

const CheckBox = React.memo(
    forwardRef<CheckBoxRef, CheckBoxProps>((props, ref) => {
        const {
            Name,
            Content,
            IsThreeState = false,
            Checked,
            Unchecked,
            Indeterminate,
            IsChecked = false,
            Classes,
            children,
        } = props;

        const checkboxRef = useRef<HTMLInputElement>(null);
        const [checkedState, setCheckedState] = useState<boolean | null>(IsChecked);

        useImperativeHandle(ref, () => ({
            SetChecked: (value: boolean | null) => {
                const newState = IsThreeState ? value : value === null ? false : value;
                setCheckedState(newState);
                if (newState === true && Checked) Checked();
                else if (newState === false && Unchecked) Unchecked();
                else if (newState === null && Indeterminate) Indeterminate();
            },
            GetChecked: () => checkedState,
            FocusCheckBox: () => {
                checkboxRef.current?.focus();
            },
        }));

        useEffect(() => {
            if (checkboxRef.current) {
                checkboxRef.current.indeterminate = checkedState === null;
            }
        }, [checkedState]);

        const handleChange = useCallback(() => {
            const newCheckedState = checkedState !== true;
            setCheckedState(newCheckedState);
            if (newCheckedState) Checked?.();
            else Unchecked?.();
        }, [checkedState, Checked, Unchecked]);

        return (
            <label
                className={`checkbox-label${Classes ? ' ' + Classes : ''}`}
                htmlFor={Name}
                aria-checked={checkedState === null ? 'mixed' : checkedState ? 'true' : 'false'}
                role="checkbox"
            >
                <input
                    ref={checkboxRef}
                    id={Name}
                    type="checkbox"
                    className="checkbox-input"
                    checked={checkedState === true}
                    onChange={handleChange}
                    aria-checked={checkedState === null ? 'mixed' : checkedState ? 'true' : 'false'}
                />
                <span className="checkbox-content">
                    {children || Content}
                </span>
            </label>
        );
    })
) as CheckBoxComponent;

CheckBox.displayName = 'CheckBox';
CheckBox.Content = CheckBoxContent;

export default CheckBox;