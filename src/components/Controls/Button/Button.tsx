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
    Disabled?: boolean;
    Content?: ReactNode;
    children?: ReactNode;
    AriaLabel?: string;
    Style?: string;
}

export interface ButtonRef {
    GetContent: () => ReactNode;
    SetContent: (content: ReactNode) => void;
    GetDisabled: () => boolean | undefined;
    SetDisabled: (disabled: boolean) => void;
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
        Disabled = false,
        Content,
        children,
        AriaLabel,
        Style,
      } = props;

      const buttonRef = useRef<HTMLButtonElement>(null);
      const [content, SetContent] = useState<ReactNode>(Content);
      const [disabled, SetDisabled] = useState(Disabled);

    useImperativeHandle(
        ref,
        () => ({
            GetContent: () => content,
            SetContent: (newContent: ReactNode) => SetContent(newContent),
            GetDisabled: () => disabled,
            SetDisabled: (newDisabled: boolean) => SetDisabled(newDisabled),
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
        [content, disabled, OnClick, OnCommand]
    );

    const handleMouseEvent = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            if (!disabled && OnClick) OnClick(event);
            if (OnCommand) OnCommand(event);
        },
        [disabled, OnClick, OnCommand]
    );

    const handleKeyEvent = useCallback(
        (event: React.KeyboardEvent<HTMLButtonElement>) => {
            if (event.key === 'Enter' || event.key === ' ') {
                if (event.key === ' ') event.preventDefault();
                if (!disabled && OnClick) OnClick(event);
                if (OnCommand) OnCommand(event);
            }
        },
        [disabled, OnClick, OnCommand]
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

    const buttonClassName = `btn${Classes ? ' ' + Classes : ''}${
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
            disabled={disabled && !OnCommand}
            aria-disabled={disabled}
            style={Classes}
            {...eventProps}
        >
            {imageBefore}
            <span className='lbl'>
                {contentChildren.length > 0 ? contentChildren : content}
            </span>
            {imageAfter}
        </button>
    );
})) as ButtonComponent;

Button.displayName = 'Button';
Button.Content = ButtonContent;
Button.Image = ButtonImage;
export default Button;