import { FrameworkElement } from '../FrameworkElement';
import { ControlTemplate } from './ControlTemplate';
import { ControlBoolFlags } from '../../enums';

export class Control extends FrameworkElement {
    private _templateCache: ControlTemplate | null = null;
    private _controlBoolField: ControlBoolFlags = ControlBoolFlags.DefaultState;

    constructor() {
        super();
        this.Initialize();
    }

    public get Template(): ControlTemplate | null {
        return this._templateCache;
    }

    public set Template(value: ControlTemplate | null) {
        if (this._templateCache !== value) {
            const oldTemplate = this._templateCache;
            this._templateCache = value;

            if (oldTemplate !== null && value !== null)
                this.OnTemplateChanged(oldTemplate, value);
        }
    }

    protected OnTemplateChangedprivate(oldTemplate: ControlTemplate, newTemplate?: ControlTemplate): void {
        this.OnTemplateChanged(oldTemplate, newTemplate);
    }

    public OnTemplateChanged(_oldTemplate?: ControlTemplate, _newTemplate?: ControlTemplate): void {
        // Template changed logic
    }

    // Properties
    public get BorderBrush(): Brush {
        return this.GetValue(BorderBrushProperty);
    }

    public set BorderBrush(value: Brush) {
        this.SetValue(BorderBrushProperty, value);
    }

    public get Background(): Brush {
        return this.GetValue(BackgroundProperty);
    }

    public set Background(value: Brush) {
        this.SetValue(BackgroundProperty, value);
    }

    public get Foreground(): Brush {
        return this.GetValue(ForegroundProperty);
    }

    public set Foreground(value: Brush) {
        this.SetValue(ForegroundProperty, value);
    }

    public get FontFamily(): FontFamily {
        return this.GetValue(FontFamilyProperty);
    }

    public set FontFamily(value: FontFamily) {
        this.SetValue(FontFamilyProperty, value);
    }

    public get FontSize(): number {
        return this.GetValue(FontSizeProperty);
    }

    public set FontSize(value: number) {
        this.SetValue(FontSizeProperty, value);
    }

    public get FontWeight(): FontWeight {
        return this.GetValue(FontWeightProperty);
    }

    public set FontWeight(value: FontWeight) {
        this.SetValue(FontWeightProperty, value);
    }

    public get HorizontalContentAlignment(): HorizontalAlignment {
        return this.GetValue(HorizontalContentAlignmentProperty);
    }

    public set HorizontalContentAlignment(value: HorizontalAlignment) {
        this.SetValue(HorizontalContentAlignmentProperty, value);
    }

    public get VerticalContentAlignment(): VerticalAlignment {
        return this.GetValue(VerticalContentAlignmentProperty);
    }

    public set VerticalContentAlignment(value: VerticalAlignment) {
        this.SetValue(VerticalContentAlignmentProperty, value);
    }

    public get Padding(): Thickness {
        return this.GetValue(PaddingProperty);
    }

    public set Padding(value: Thickness) {
        this.SetValue(PaddingProperty, value);
    }

    // Methods

    protected MeasureOverride(constraint: Size): Size {
        const count = this.VisualChildrenCount;
        if (count > 0) {
            const child = this.GetVisualChild(0);
            if (child) {
                child.Measure(constraint);
                return child.DesiredSize;
            }
        }
        return { width: 0, height: 0 };
    }

    protected ArrangeOverride(arrangeBounds: Size): Size {
        const count = this.VisualChildrenCount;
        if (count > 0) {
            const child = this.GetVisualChild(0);
            if (child) {
                child.Arrange({ x: 0, y: 0, width: arrangeBounds.width, height: arrangeBounds.height });
            }
        }
        return arrangeBounds;
    }

    public static HandleDoubleClick(sender: Control, e: MouseButtonEventArgs): void {
        if (e.ClickCount === 2) {
            const ctrl = sender;
            const doubleClick = new MouseButtonEventArgs(e.MouseDevice, e.Timestamp, e.ChangedButton, e.StylusDevice);

            if (e.RoutedEvent === UIElement.PreviewMouseLeftButtonDownEvent || e.RoutedEvent === UIElement.PreviewMouseRightButtonDownEvent) {
                doubleClick.RoutedEvent = Control.PreviewMouseDoubleClickEvent;
                doubleClick.Source = e.OriginalSource;
                ctrl.OnPreviewMouseDoubleClick(doubleClick);
            } else {
                doubleClick.RoutedEvent = Control.MouseDoubleClickEvent;
                doubleClick.Source = e.OriginalSource;
                ctrl.OnMouseDoubleClick(doubleClick);
            }

            if (doubleClick.Handled) {
                e.Handled = true;
            }
        }
    }

    protected OnPreviewMouseDoubleClick(e: MouseButtonEventArgs): void {
        this.RaiseEvent(e);
    }

    protected OnMouseDoubleClick(e: MouseButtonEventArgs): void {
        this.RaiseEvent(e);
    }

    private VisualStateChangeSuspended(): boolean {
        return this.ReadControlFlag(ControlBoolFlags.VisualStateChangeSuspended);
    }

    private WriteControlFlag(flag: ControlBoolFlags, value: boolean): void {
        if (value) {
            this._controlBoolField |= flag;
        } else {
            this._controlBoolField &= ~flag;
        }
    }

    protected ChangeVisualState(useTransitions: boolean): void {
        this.ChangeValidationVisualState(useTransitions);
    }

    protected ChangeValidationVisualState(useTransitions: boolean): void {
        if (Validation.GetHasError(this)) {
            if (this.IsKeyboardFocused) {
                VisualStateManager.GoToState(this, "StateInvalidFocused", useTransitions);
            } else {
                VisualStateManager.GoToState(this, "StateInvalidUnfocused", useTransitions);
            }
        } else {
            VisualStateManager.GoToState(this, "StateValid", useTransitions);
        }
    }
}