import React, {
    forwardRef, useImperativeHandle, useRef, ReactNode, useState, useCallback, useMemo, ReactElement
} from 'react';
import ButtonContent, { ButtonContentProps } from './Button.Content';
import ButtonImage, { ButtonImageProps } from './Button.Image';
import './Button.scss';

export interface ButtonProps {
    Name?: string;
    Click?: (
        event: React.MouseEvent<HTMLButtonElement>
        | React.KeyboardEvent<HTMLButtonElement>
    ) => void;
    Command?: (
        event: React.MouseEvent<HTMLButtonElement>
        | React.KeyboardEvent<HTMLButtonElement>
    ) => void;
    ClickMode?: 'Release' | 'Press' | 'Hover';
    Classes?: React.CSSProperties;
    IsEnabled?: boolean;
    Content?: ReactNode;
    ExtendedContent?: ReactNode[];
    children?: ReactNode;
    AriaLabel?: string;
    Style?: string;
    AriaExpanded?: boolean;
    AriaHasPopup?: boolean | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';
}

export interface ButtonRef {
    GetContent: () => ReactNode;
    SetContent: (content: ReactNode) => void;
    GetEnabled: () => boolean | undefined;
    SetEnabled: (enabled: boolean) => void;
    FireClick: () => void;
    FireCommand: () => void;
    FocusButton: () => void;
    Element: HTMLButtonElement | null;
}

type ButtonComponent = React.MemoExoticComponent<
    React.ForwardRefExoticComponent<
        ButtonProps
        & React.RefAttributes<ButtonRef>
    >
> & {
    Content: React.FC<ButtonContentProps>;
    Image: React.FC<ButtonImageProps>;
};

const Button = React.memo(
    forwardRef<ButtonRef, ButtonProps>((props, ref) => {
      const {
        Name,
        Click: OnClick,
        Command: OnCommand,
        ClickMode = 'Release',
        Classes,
        IsEnabled: Enabled = true,
        Content,
        ExtendedContent = [],
        children,
        AriaLabel,
        Style,
        AriaExpanded,
        AriaHasPopup
      } = props;

      const buttonRef = useRef<HTMLButtonElement>(null);
      const [content, SetContent] = useState<ReactNode>(Content);
      const [enabled, SetEnabled] = useState(Enabled);

    useImperativeHandle(
        ref,
        () => ({
            GetContent: () => content,
            SetContent: (newContent: ReactNode) => SetContent(newContent),
            GetEnabled: () => enabled,
            SetEnabled: (newEnabled: boolean) => SetEnabled(newEnabled),
            FireClick: () => {
                if (OnClick && buttonRef.current) {
                const event = new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true,
                    view: window,
                });
                buttonRef.current.dispatchEvent(event);
                }
            },
            FireCommand: () => {
                if (OnCommand && buttonRef.current) {
                const event = new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true,
                    view: window,
                });
                buttonRef.current.dispatchEvent(event);
                }
            },
            FocusButton: () => {
                buttonRef.current?.focus();
            },
            Element: buttonRef.current,
        }),
        [content, enabled, OnClick, OnCommand]
    );

    const handleMouseEvent = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            if (!enabled && OnClick) OnClick(event);
            if (OnCommand) OnCommand(event);
        },
        [enabled, OnClick, OnCommand]
    );

    const handleKeyEvent = useCallback(
        (event: React.KeyboardEvent<HTMLButtonElement>) => {
            if (event.key === 'Enter' || event.key === ' ') {
                if (event.key === ' ') event.preventDefault();
                if (!enabled && OnClick) OnClick(event);
                if (OnCommand) OnCommand(event);
            }
        },
        [enabled, OnClick, OnCommand]
    );

    const eventProps = useMemo(() => {
        if (ClickMode === 'Press') {
            return {
                onMouseDown: handleMouseEvent,
                onKeyDown: handleKeyEvent,
            };
        } else if (ClickMode === 'Hover') {
            return {
                onMouseEnter: handleMouseEvent,
            };
        } else {
            return {
                onMouseUp: handleMouseEvent,
                onKeyUp: handleKeyEvent,
            };
        }
    }, [ClickMode, handleMouseEvent, handleKeyEvent]);

    const childArray = React.Children.toArray(children || []);

    function isButtonContent(
        element: ReactNode
    ): element is ReactElement<ButtonContentProps> {
        return (
            React.isValidElement(element) &&
            (element.type as React.ComponentType).displayName === 'ButtonContent'
        );
    }
  
    function isButtonImage(
        element: ReactNode
    ): element is ReactElement<ButtonImageProps> {
        return (
            React.isValidElement(element) &&
            (element.type as React.ComponentType).displayName === 'ButtonImage'
        );
    }

    const contentChildren = childArray
        .filter(isButtonContent)
        .map((child) => {
            return React.cloneElement(child, {
            Content: child.props.InheritContent ? content : child.props.Content,
        });
    });

    const imageBefore = childArray.filter(
        (child) =>
            isButtonImage(child) &&
            (child.props.Placement === 'Left' || child.props.Placement === undefined)
    );

    const imageAfter = childArray.filter(
        (child) => isButtonImage(child) && child.props.Placement === 'Right'
    );

    const buttonClassName = `button${Classes ? ' ' + Classes : ''}${
        Style ? ' ' + Style : ''
    }`;

    return (
        <button
            ref={buttonRef}
            id={Name}
            aria-label={
                AriaLabel ||
                (typeof content === 'string' ? content : 'Button')
              }
            className={buttonClassName}
            disabled={!enabled && !OnCommand}
            aria-disabled={!enabled}
            aria-expanded={AriaExpanded}
            aria-haspopup={AriaHasPopup}
            style={Classes}
            {...eventProps}
        >
            {imageBefore}
            <span className='label'>
                {contentChildren.length > 0 ? contentChildren : content}
            </span>
            {imageAfter}
            {ExtendedContent}
        </button>
    );
})) as ButtonComponent;

Button.displayName = 'Button';
Button.Content = ButtonContent;
Button.Image = ButtonImage;
export default Button;