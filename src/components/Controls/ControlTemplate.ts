import { FrameworkElement } from '../FrameworkElement';
import { Control } from './Control';

class TriggerCollection {
    private triggers: any[] = [];
    private sealed: boolean = false;

    add(trigger: any): void {
        if (this.sealed) {
            throw new Error("Cannot add triggers to a sealed TriggerCollection.");
        }
        this.triggers.push(trigger);
    }

    Seal(): void {
        this.sealed = true;
    }

    get length(): number {
        return this.triggers.length;
    }
}

export class ControlTemplate {
    private _targetType: Function | null = null;
    private _triggers: TriggerCollection | null = null;
    private isSealed: boolean = false;

    // Default target type (set to Control)
    static readonly DefaultTargetType: Function = Control;

    constructor(targetType: Function | null = null) {
        if (targetType) {
            this.validateTargetType(targetType);
            this._targetType = targetType;
        }
    }

    // Validate the target type (it must be a Control or a subclass)
    private validateTargetType(targetType: Function): void {
        if (!targetType) {
            throw new Error("TargetType cannot be null.");
        }
        if (!(targetType.prototype instanceof Control)) {
            throw new Error(`Invalid ControlTemplate target type: ${targetType.name}`);
        }
    }

    // Property for TargetType
    public get TargetType(): Function | null {
        return this._targetType;
    }

    public set TargetType(value: Function | null) {
        this.validateTargetType(value!);
        this.checkSealed();
        this._targetType = value;
    }

    // Collection of Triggers
    public get Triggers(): TriggerCollection {
        if (!this._triggers) {
            this._triggers = new TriggerCollection();
            if (this.isSealed) {
                this._triggers.Seal();
            }
        }
        return this._triggers;
    }

    // Validation to ensure the template is applied to a compatible control
    protected validateTemplatedParent(templatedParent: FrameworkElement): void {
        if (!(templatedParent instanceof Control)) {
            throw new Error("Templated parent must be a Control.");
        }
    
        if (templatedParent.Template !== this) {
            throw new Error("Cannot template a control that is not associated with this template.");
        }
    }

    // Helper to check if the template is sealed (immutable)
    private checkSealed(): void {
        if (this.isSealed) {
            throw new Error("Cannot modify a sealed ControlTemplate.");
        }
    }

    // Sealing the template makes it immutable
    public Seal(): void {
        this.isSealed = true;
        if (this._triggers) {
            this._triggers.Seal();
        }
    }
}