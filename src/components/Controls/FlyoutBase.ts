import React from 'react';
import { Placement } from '../../enums';
import ContentControl from './ContentControl';

type FlyoutBaseProps = {
    Content?: string | React.ReactNode;
    isOpen?: boolean;
    Placement?: Placement;
    Target?: React.RefObject<HTMLElement>;
};

class FlyoutBase extends ContentControl {
    private _isOpen: boolean;
    private _placement: Placement;
    private _target: React.RefObject<HTMLElement>;

    constructor(props: FlyoutBaseProps) {
        super(props.Content || '');
        this._isOpen = props.isOpen || false;
        this._placement = props.Placement || Placement.Auto;
        this._target = props.Target || React.createRef<HTMLElement>();
    }

    public Show(): void {
        this._isOpen = true;
        this.forceUpdate();
    }

    public Hide(): void {
        this._isOpen = false;
        this.forceUpdate();
    }

    public ShowAt(target: React.RefObject<HTMLElement>): void {
        this._target = target;
        this._isOpen = true;
        this.forceUpdate();
    }

    public getIsOpen(): boolean {
        return this._isOpen;
    }

    public setIsOpen(value: boolean): void {
        this._isOpen = value;
        this.forceUpdate();
    }

    public getPlacement(): Placement {
        return this._placement;
    }

    public setPlacement(value: Placement): void {
        this._placement = value;
        this.forceUpdate();
    }

    public getTarget(): React.RefObject<HTMLElement> {
        return this._target;
    }

    protected forceUpdate(): void {
        return;
    }
}

export default FlyoutBase;