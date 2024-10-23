import { UIElement } from "./UIElement";

type Size = {
    width: number;
    height: number;
};

type Rect = {
    x: number;
    y: number;
    width: number;
    height: number;
};

export class FrameworkElement extends UIElement {
    private _style: any = null;
    private _useLayoutRounding: boolean = false;
    private _overridesDefaultStyle: boolean = false;
    private hasTemplateGeneratedSubTree: boolean = false;
    private _templateChild: UIElement | null = null;
    private _desiredSize: Size = { width: 0, height: 0 };

    constructor() {
        super();
        this.Initialize();
    }

    get Style(): any {
        return this._style;
    }

    set Style(value: any) {
        this._style = value;
        this.OnStyleChanged(null, value);
    }

    get UseLayoutRounding(): boolean {
        return this._useLayoutRounding;
    }

    set UseLayoutRounding(value: boolean) {
        this._useLayoutRounding = value;
        this.InvalidateMeasure();
    }

    get OverridesDefaultStyle(): boolean {
        return this._overridesDefaultStyle;
    }

    set OverridesDefaultStyle(value: boolean) {
        this._overridesDefaultStyle = value;
        this.InvalidateMeasure();
    }

    public ApplyTemplate(): boolean {
        this.OnPreApplyTemplate();

        let visualsCreated = false;
        if (!this.hasTemplateGeneratedSubTree) {
            visualsCreated = true;
            this.hasTemplateGeneratedSubTree = true;
            this.OnApplyTemplate();
        }

        this.OnPostApplyTemplate();
        return visualsCreated;
    }

    protected OnPreApplyTemplate(): void {
        // Custom logic for subclasses to handle pre-template actions
    }

    public OnApplyTemplate(): void {
        // Logic for when the template has been applied
    }

    protected OnPostApplyTemplate(): void {
        // Custom logic to be executed after applying the template
    }

    public get DesiredSize(): Size {
        return this._desiredSize;
    }

    // The Measure method calculates the desired size of the element
    public Measure(availableSize: Size): void {
        // Logic to calculate the desired size based on availableSize and content
        // For now, we'll set the DesiredSize to the availableSize as a default behavior
        this._desiredSize = this.MeasureCore(availableSize);
    }

    // MeasureCore provides a place to define how the element determines its size
    protected MeasureCore(availableSize: Size): Size {
        // Placeholder logic - in reality, this would depend on the element's content
        return availableSize;  // Default to the available size
    }

    public Arrange(_finalRect: Rect): void {
        // Arrange logic goes here
    }

    public BeginStoryboard(storyboard: any): void {
        this.BeginStoryboardWithOptions(storyboard, "SnapshotAndReplace", false);
    }

    public BeginStoryboardWithOptions(storyboard: any, handoffBehavior: string, isControllable: boolean): void {
        storyboard.start(this, handoffBehavior, isControllable);
    }

    protected OnStyleChanged(_oldStyle: any, _newStyle: any): void {
        // Logic for when style is changed
    }

    get VisualChildrenCount(): number {
        return this._templateChild ? 1 : 0;
    }

    get TemplateChild(): UIElement | null {
        return this._templateChild;
    }

    set TemplateChild(value: UIElement | null) {
        if (value !== this._templateChild) {
            if (this._templateChild) {
                this.RemoveVisualChild(this._templateChild);
            }
            this._templateChild = value;
            if (value) {
                this.AddVisualChild(value);
            }
        }
    }

    protected AddVisualChild(_child: UIElement): void {
        // Logic to add a visual child element
    }

    protected RemoveVisualChild(_child: UIElement): void {
        // Logic to remove a visual child element
    }

    protected ParentLayoutInvalidated(_child: UIElement): void {
        this.InvalidateMeasure();
    }
}