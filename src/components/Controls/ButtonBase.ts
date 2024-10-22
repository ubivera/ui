import React from 'react';
import Control, { ControlProps } from './Control';

type ClickMode = 'Release' | 'Press' | 'Hover';

type ButtonBaseProps = ControlProps & {
    Name?: string;
    Content?: string | React.ReactNode;
    Click?: () => void;
    ClickMode?: ClickMode;
    Command?: () => void;
    Style?: 'Primary' | 'Secondary' | 'Accent';
    children?: React.ReactNode;
};

class ButtonBase extends Control<ButtonBaseProps> {
    private _clickHandler?: () => void;
    private _clickMode: ClickMode;
    private _content: string | React.ReactNode;
    private _command?: () => void;
    private _style: 'Primary' | 'Secondary' | 'Accent';

    constructor(props: ButtonBaseProps) {
        super(props);
        this._clickHandler = props.Click;
        this._clickMode = props.ClickMode ?? 'Release';
        this._content = props.Content || props.children || '';
        this._command = props.Command;
        this._style = props.Style ?? 'Primary';
    }

    static defaultProps = {
        ClickMode: 'Release'
    };

    public getContent(): string | React.ReactNode {
        return this._content;
    }

    public setContent(content: string | React.ReactNode): void {
        this._content = content;
        this.forceUpdate();
    }

    public getStyle(): string {
        return this._style;
    }

    protected handleClick = () => {
        if (this.getIsEnabled() && this._clickHandler && this._clickMode === 'Release') {
            this._clickHandler();
        }

        if (this._command) {
            this._command();
        }
    };

    protected handleMouseDown = () => {
        if (this.getIsEnabled() && this._clickHandler && this._clickMode === 'Press') {
            this._clickHandler();
        }

        if (this._command) {
            this._command();
        }
    };

    protected handleMouseEnter = () => {
        if (this.getIsEnabled() && this._clickHandler && this._clickMode === 'Hover') {
            this._clickHandler();
        }

        if (this._command) {
            this._command();
        }
    };

    protected handleKeyPress = (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (this.getIsEnabled() && this._clickHandler && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();

            if (this._clickMode === 'Press' || this._clickMode === 'Release') {
                this._clickHandler();
            }
        }

        if (this._command) {
            this._command();
        }
    };
}

export default ButtonBase;