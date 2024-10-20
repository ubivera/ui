import React from 'react';

export type ControlProps = {
    IsEnabled?: boolean;
    Visibility?: 'visible' | 'hidden';
    IsFocused?: boolean;
};

class Control<P extends ControlProps = ControlProps> extends React.Component<P>
{
    private _isEnabled: boolean;
    private _visibility: 'visible' | 'hidden';
    private _isFocused: boolean;

    constructor(props: P)
    {
        super(props);
        this._isEnabled = props.IsEnabled !== undefined ? props.IsEnabled : true;
        this._visibility = props.Visibility !== undefined ? props.Visibility : 'visible';
        this._isFocused = props.IsFocused !== undefined ? props.IsFocused : false;
    }

    public getIsEnabled(): boolean
    {
        return this._isEnabled;
    }

    public setIsEnabled(value: boolean): void
    {
        this._isEnabled = value;
        this.forceUpdate();
    }

    public getVisibility(): 'visible' | 'hidden'
    {
        return this._visibility;
    }

    public setVisibility(value: 'visible' | 'hidden'): void
    {
        this._visibility = value;
        this.forceUpdate();
    }

    public focus(): void
    {
        this._isFocused = true;
        this.forceUpdate();
    }

    public blur(): void
    {
        this._isFocused = false;
        this.forceUpdate();
    }

    public getIsFocused(): boolean
    {
        return this._isFocused;
    }

    public toggleIsEnabled(): void
    {
        this.setIsEnabled(!this._isEnabled);
    }

    public toggleVisibility(): void
    {
        this.setVisibility(this._visibility === 'visible' ? 'hidden' : 'visible');
    }
}

export default Control;