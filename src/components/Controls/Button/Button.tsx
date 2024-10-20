import React from 'react';
import ContentControl from '../ContentControl';
import './styles.scss';

type ButtonProps =
{
    Content?: string | React.ReactNode;
    Click?: () => void;
    IsEnabled?: boolean;
    Style?: 'Primary' | 'Secondary' | 'Accent';
    children?: React.ReactNode;
};

class Button extends React.Component<ButtonProps>
{
    private _isEnabled: boolean;
    private _style: 'Primary' | 'Secondary' | 'Accent';
    private _clickHandler?: () => void;

    constructor(props: ButtonProps)
    {
        super(props);
        const contentControl = new ContentControl(props.Content || props.children);
        this._isEnabled = props.IsEnabled ?? true;
        this._style = props.Style ?? 'Primary';
        this._clickHandler = props.Click;

        this.getContent = contentControl.getContent.bind(contentControl);
        this.setContent = contentControl.setContent.bind(contentControl);
    }

    private handleClick = () =>
    {
        if (this._isEnabled && this._clickHandler)
            {
            this._clickHandler();
        }
    };

    private handleKeyPress = (e: React.KeyboardEvent<HTMLButtonElement>) =>
    {
        if (this._isEnabled && this._clickHandler && (e.key === 'Enter' || e.key === ' '))
            {
            e.preventDefault();
            this._clickHandler();
        }
    };

    public render(): JSX.Element
    {
        return (
            <button
                onClick={this.handleClick}
                onKeyDown={this.handleKeyPress}
                className={this._style}
                disabled={!this._isEnabled}
                tabIndex={0}
            >
                {this.getContent()} {/* Inherited from ContentControl */}
            </button>
        );
    }

    public getContent!: () => string | React.ReactNode;
    public setContent!: (content: string | React.ReactNode) => void;
}

export default Button;