import React, { forwardRef, useImperativeHandle, useRef, ReactNode } from 'react';
import ButtonContent, { ButtonContentProps } from './Button.Content';
import ButtonImage, { ButtonImageProps } from './Button.Image';
import './Button.scss';

export interface ButtonProps {
    Name?: string;
    Click?: ( event: | React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement> ) => void;
    ClickMode?: 'Release' | 'Press' | 'Hover';
    Style?: string;
    Disabled?: boolean;
    Command?: ( event: | React.MouseEvent<HTMLButtonElement>| React.KeyboardEvent<HTMLButtonElement> ) => void;
    Content?: string;
    children?: ReactNode;
}

export interface ButtonRef {
    getContent: () => string | undefined;
    setContent: (content: string) => void;
    getDisabled: () => boolean | undefined;
    setDisabled: (disabled: boolean) => void;
    fireClick: () => void;
    fireCommand: () => void;
    focusButton: () => void;
}

interface ButtonComponent extends React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<ButtonRef>> {
    Content: React.FC<ButtonContentProps>;
    Image: React.FC<ButtonImageProps>;
}

const Button = forwardRef<ButtonRef, ButtonProps>((props, ref) => {
    const {
        Name,
        Click,
        ClickMode = 'Release',
        Style = null,
        Disabled = false,
        Command,
        Content,
        children,
    } = props;

    const buttonRef = useRef<HTMLButtonElement>(null);
    const [content, setContent] = React.useState(Content);
    const [disabled, setDisabled] = React.useState(Disabled);

    useImperativeHandle(ref, () => ({
        getContent: () => content,
        setContent: (newContent: string) => setContent(newContent),
        getDisabled: () => disabled,
        setDisabled: (newDisabled: boolean) => setDisabled(newDisabled),
        fireClick: () => {
            if (Click && buttonRef.current) Click({} as React.MouseEvent<HTMLButtonElement>);
        },
        fireCommand: () => {
            if (Command && buttonRef.current) Command({} as React.MouseEvent<HTMLButtonElement>);
        },
        focusButton: () => {
            if (buttonRef.current) buttonRef.current.focus();
        },
    }), [content, disabled, Click, Command]);

    const handleMouseEvent = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (!disabled && Click) {
            Click(event);
        }

        if (Command) {
            Command(event);
        }
    };

    const handleKeyEvent = (event: React.KeyboardEvent<HTMLButtonElement>) => {
        if (event.key === 'Enter' || event.key === ' ') {
            if (event.key === ' ') {
                event.preventDefault();
            }

            if (!disabled && Click) {
                Click(event);
            }

            if (Command) {
                Command(event);
            }
        }
    };

    const eventProps = ClickMode === 'Press' ? {
        onMouseDown: handleMouseEvent,
        onKeyDown: handleKeyEvent,
    } : ClickMode === 'Hover' ? {
        onMouseEnter: handleMouseEvent,
    } : {
        onMouseUp: handleMouseEvent,
        onKeyUp: handleKeyEvent,
    };

    const childArray = React.Children.toArray(children);

    const contentChildren = childArray
        .filter((child) => {
            return (
                React.isValidElement(child) &&
                (child.type as any).displayName === 'ButtonContent'
            );
        })
        .map((child) => {
            const childElement = child as React.ReactElement<ButtonContentProps>;

            return React.cloneElement(childElement, {
                Content: childElement.props.InheritContent
                ? content
                : childElement.props.Content,
            });
        });

    const imageBefore = childArray.filter((child) => {
        return (
            React.isValidElement(child) &&
            (child.type as any).displayName === 'ButtonImage' &&
            (
                (child.props as ButtonImageProps).Placement === 'Left'
                || (child.props as ButtonImageProps).Placement === undefined
            )
        );
    });

    const imageAfter = childArray.filter((child) => {
        return (
            React.isValidElement(child) &&
            (child.type as any).displayName === 'ButtonImage' &&
            (child.props as ButtonImageProps).Placement === 'Right'
        );
    });

    return (
        <button
            ref={buttonRef}
            id={Name}
            aria-label={content ? content : 'button'}
            className={'btn' + (Style ? ' ' + Style : '')}
            disabled={disabled}
            aria-disabled={disabled}
            {...eventProps}
        >
            {imageBefore}
            <span className='lbl'>{contentChildren.length > 0 ? contentChildren : content}</span>
            {imageAfter}
        </button>
    );
}) as ButtonComponent;

Button.Content = ButtonContent;
Button.Image = ButtonImage;
export default Button;