export enum ControlBoolFlags {
    DefaultState = 0x0000,
    ContentIsNotLogical = 0x0001,
    IsSpaceKeyDown = 0x0002,
    HeaderIsNotLogical = 0x0004,
    CommandDisabled = 0x0008,
    ContentIsItem = 0x0010,
    HeaderIsItem = 0x0020,
    ScrollHostValid = 0x0040,
    ContainsSelection = 0x0080,
    VisualStateChangeSuspended = 0x0100,
}