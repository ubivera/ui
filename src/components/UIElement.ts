import { Visibility } from '../enums';

export class UIElement {
    protected static readonly AllowDropProperty: boolean = false;
    protected static readonly RenderTransformProperty = 'RenderTransform';
    protected static readonly RenderTransformOriginProperty = 'RenderTransformOrigin';
    protected static readonly VisualOffset = 'VisualOffset';

    protected SnapsToDevicePixelsCache: boolean;
    protected ClipToBoundsCache: boolean;
    protected visibilityCache: Visibility;

    private visibility: Visibility;
    private measureDirty: boolean = false;
    private arrangeDirty: boolean = false;
    protected neverMeasured: boolean = true;
    protected neverArranged: boolean = true;
    private measureInProgress: boolean = false;
    private arrangeInProgress: boolean = false;
    protected desiredSize: { width: number, height: number } = { width: 0, height: 0 };
    private _finalRect: { x: number, y: number, width: number, height: number } = { x: 0, y: 0, width: 0, height: 0 };
    private _size: { width: number, height: number } = { width: 0, height: 0 };

    constructor() {
        this.visibility = Visibility.Visible;
        this.SnapsToDevicePixelsCache = false;
        this.ClipToBoundsCache = false;
        this.visibilityCache = Visibility.Visible;

        this.Initialize();
    }

    static RegisterEvents(uiElementType: any): void {
        UIElement.RenderOptions.EdgeModeProperty.OverrideMetadata(
            uiElementType,
            new UIPropertyMetadata(UIElement.EdgeMode_Changed)
        );

        UIElement.RenderOptions.BitmapScalingModeProperty.OverrideMetadata(
            uiElementType,
            new UIPropertyMetadata(UIElement.BitmapScalingMode_Changed)
        );

        UIElement.RenderOptions.ClearTypeHintProperty.OverrideMetadata(
            uiElementType,
            new UIPropertyMetadata(UIElement.ClearTypeHint_Changed)
        );
    }

    private Initialize(): void {
        this.BeginPropertyInitialization();
        this.neverMeasured = true;
        this.neverArranged = true;
        this.SnapsToDevicePixelsCache = UIElement.GetDefaultSnapsToDevicePixels();
        this.ClipToBoundsCache = UIElement.GetDefaultClipToBounds();
        this.visibilityCache = Visibility.Visible;
        this.SetFlags(true, "IsUIElement");
    }

    private BeginPropertyInitialization(): void {
        this.SnapsToDevicePixelsCache = UIElement.GetDefaultSnapsToDevicePixels();
        this.ClipToBoundsCache = UIElement.GetDefaultClipToBounds();
    }

    static GetDefaultSnapsToDevicePixels(): boolean {
        return false;
    }

    static GetDefaultClipToBounds(): boolean {
        return false;
    }

    private static EdgeMode_Changed(): void {
        // EdgeMode changed logic
    }

    private static BitmapScalingMode_Changed(): void {
        // BitmapScalingMode changed logic
    }

    private static ClearTypeHint_Changed(): void {
        // ClearTypeHint changed logic
    }

    public flags: Map<string, boolean> = new Map();

    public SetFlags(value: boolean, flag: string): void {
        this.flags.set(flag, value);
    }

    public InvalidateMeasure(): void {
        if (!this.measureDirty && !this.measureInProgress) {
            ContextLayoutManager.GetMeasureQueue().push(this);
            this.measureDirty = true;
        }
    }

    public InvalidateArrange(): void {
        if (!this.arrangeDirty && !this.arrangeInProgress) {
            ContextLayoutManager.GetArrangeQueue().push(this);
            this.arrangeDirty = true;
        }
    }

    get Visibility(): Visibility {
        return this.visibility;
    }

    set Visibility(value: Visibility) {
        this.visibility = value;
        this.InvalidateMeasure();
    }

    get IsMeasureValid(): boolean {
        return !this.measureDirty;
    }

    get IsArrangeValid(): boolean {
        return !this.arrangeDirty;
    }

    public Measure(availableSize: { width: number, height: number }): void {
        if (this.Visibility === Visibility.Collapsed) {
            this.desiredSize = { width: 0, height: 0 };
        } else {
            this.desiredSize = this.MeasureCore(availableSize);
        }
    }

    protected MeasureCore(_availableSize: { width: number, height: number }): { width: number, height: number } {
        return { width: 0, height: 0 };
    }

    public Arrange(finalRect: { x: number, y: number, width: number, height: number }): void {
        if (this.Visibility === Visibility.Collapsed) {
            return;
        }

        if (!this.IsArrangeValid || !this.AreRectEqual(finalRect, this._finalRect)) {
            this.ArrangeCore(finalRect);
        }
    }

    protected ArrangeCore(finalRect: { x: number, y: number, width: number, height: number }): void {
        this._finalRect = finalRect;
        this.RenderSize = { width: finalRect.width, height: finalRect.height };
    }

    private AreRectEqual(rect1: any, rect2: any): boolean {
        return rect1.x === rect2.x && rect1.y === rect2.y &&
            rect1.width === rect2.width && rect1.height === rect2.height;
    }

    get RenderSize(): { width: number, height: number } {
        return this._size;
    }

    set RenderSize(size: { width: number, height: number }) {
        this._size = size;
    }

    private LayoutUpdated: EventListener | null = null;

    addEventListener(event: string, listener: EventListener) {
        if (event === 'layoutUpdated') {
            this.LayoutUpdated = listener;
        }
    }

    removeEventListener(event: string, _listener: EventListener) {
        if (event === 'layoutUpdated') {
            this.LayoutUpdated = null;
        }
    }

    triggerLayoutUpdate() {
        if (this.LayoutUpdated) {
            this.LayoutUpdated(new Event('layoutUpdated'));
        }
    }

    invalidateLayout() {
        this.triggerLayoutUpdate();
    }

    static RenderOptions = {
        EdgeModeProperty: {
            OverrideMetadata(_type: any, _metadata: any) {}
        },
        BitmapScalingModeProperty: {
            OverrideMetadata(_type: any, _metadata: any) {}
        },
        ClearTypeHintProperty: {
            OverrideMetadata(_type: any, _metadata: any) {}
        }
    };

    protected OnChildDesiredSizeChanged(_child: UIElement): void {
        this.InvalidateMeasure();
    }
}

export class ContextLayoutManager {
    private static _measureQueue: UIElement[] = [];
    private static _arrangeQueue: UIElement[] = [];

    public static GetMeasureQueue(): UIElement[] {
        return ContextLayoutManager._measureQueue;
    }

    public static GetArrangeQueue(): UIElement[] {
        return ContextLayoutManager._arrangeQueue;
    }
}

export class UIPropertyMetadata {
    protected callback: Function;

    constructor(callback: Function) {
        this.callback = callback;
    }
}