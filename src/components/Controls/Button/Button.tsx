import React from 'react';
import ButtonBase from '../ButtonBase';
import './styles.scss';

type ButtonProps = {
    Content?: string | React.ReactNode;
    Click?: () => void;
    IsEnabled?: boolean;
    Style?: 'Primary' | 'Secondary' | 'Accent';
    ClickMode?: 'Release' | 'Press' | 'Hover';
    children?: React.ReactNode;
};

class Button extends ButtonBase
{
    constructor(props: ButtonProps)
    {
        super(props);
    }

    static defaultProps = {
        IsEnabled: true,
        Style: 'Primary',
        ClickMode: 'Release'
    };

    public render(): JSX.Element
    {
        return (
            <button
                onClick={this.handleClick}
                onMouseDown={this.handleMouseDown}
                onMouseEnter={this.handleMouseEnter}
                onKeyDown={this.handleKeyPress}
                className={this.props.Style}
                disabled={!this.props.IsEnabled}
            >
                {this.getContent()}
            </button>
        );
    }
}

export default Button;