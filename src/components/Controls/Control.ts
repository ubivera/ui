import React from 'react';

export type ControlProps = {
    IsEnabled?: boolean;
};

class Control<P extends ControlProps = ControlProps> extends React.Component<P>
{
    private _isEnabled: boolean;

    constructor(props: P)
    {
        super(props);
        this._isEnabled = props.IsEnabled !== undefined ? props.IsEnabled : true;
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

    public toggleIsEnabled(): void
    {
        this.setIsEnabled(!this._isEnabled);
    }
}

export default Control;