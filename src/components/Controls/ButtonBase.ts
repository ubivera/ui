import React from 'react';

type ClickMode = 'Release' | 'Press' | 'Hover';

type ButtonBaseProps = {
    Content?: string | React.ReactNode;
    Click?: () => void;
    IsEnabled?: boolean;
    ClickMode?: ClickMode;
    Style?: 'Primary' | 'Secondary' | 'Accent';
    children?: React.ReactNode;
};

class ButtonBase extends React.Component<ButtonBaseProps>
{
    private _isEnabled: boolean;
    private _clickHandler?: () => void;
    private _clickMode: ClickMode;
    private _content: string | React.ReactNode;
    private _style: 'Primary' | 'Secondary' | 'Accent';

    constructor(props: ButtonBaseProps)
    {
        super(props);
        this._isEnabled = props.IsEnabled !== undefined ? props.IsEnabled : true;
        this._clickHandler = props.Click;
        this._clickMode = props.ClickMode ?? 'Release';
        this._content = props.Content || props.children || '';
        this._style = props.Style ?? 'Primary';
    }

    public getContent(): string | React.ReactNode
    {
        return this._content;
    }

    public setContent(content: string | React.ReactNode): void
    {
        this._content = content;
        this.forceUpdate();
    }

    public getStyle(): string
    {
        return this._style;
    }

    protected handleClick = () =>
    {
        if (this._isEnabled && this._clickHandler && this._clickMode === 'Release')
        {
            this._clickHandler();
        }
    };

    protected handleMouseDown = () =>
    {
        if (this._isEnabled && this._clickHandler && this._clickMode === 'Press')
        {
            this._clickHandler();
        }
    };

    protected handleMouseEnter = () =>
    {
        if (this._isEnabled && this._clickHandler && this._clickMode === 'Hover')
        {
            this._clickHandler();
        }
    };

    protected handleKeyPress = (e: React.KeyboardEvent<HTMLButtonElement>) =>
    {
        if (this._isEnabled && this._clickHandler && (e.key === 'Enter' || e.key === ' '))
        {
            e.preventDefault();

            if (this._clickMode === 'Press' || this._clickMode === 'Release')
            {
                this._clickHandler();
            }
        }
    };
}

export default ButtonBase;