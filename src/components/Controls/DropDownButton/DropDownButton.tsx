import React, {
    useState,
    useRef,
    useImperativeHandle,
    forwardRef,
    useCallback,
    ReactNode,
    ReactElement,
    useEffect,
} from 'react';
import Button, {ButtonProps, ButtonRef} from '../Button/Button';
import DropDownButtonFlyout, {DropDownButtonFlyoutProps} from './DropDownButton.Flyout';
import {MenuFlyoutContext} from '../../Dialogs/MenuFlyout/MenuFlyoutContext';
import DropDownButtonContent, {DropDownButtonContentProps} from './DropDownButton.Content';
import DropDownButtonImage, {DropDownButtonImageProps} from './DropDownButton.Image';
import './DropDownButton.scss';

export interface DropDownButtonProps extends ButtonProps {
    Content?: ReactNode;
    children?: ReactNode;
}

export interface DropDownButtonRef extends ButtonRef {
    openFlyout: () => void;
    closeFlyout: () => void;
}

type DropDownButtonComponent = React.MemoExoticComponent<
    React.ForwardRefExoticComponent<DropDownButtonProps & React.RefAttributes<DropDownButtonRef>>
> & {
    Flyout: React.FC<DropDownButtonFlyoutProps>;
    Content: React.FC<DropDownButtonContentProps>;
    Image: React.FC<DropDownButtonImageProps>;
};

const DropDownButton = React.memo(forwardRef<DropDownButtonRef, DropDownButtonProps>(
    ({Content, children, ...buttonProps}, ref) => {
        const [isFlyoutOpen, setIsFlyoutOpen] = useState(false);
        const buttonRef = useRef<ButtonRef>(null);
        const flyoutRef = useRef<HTMLDivElement>(null);

        useImperativeHandle(
            ref,
            () => ({
                ...buttonRef.current!,
                openFlyout: () => setIsFlyoutOpen(true),
                closeFlyout: () => setIsFlyoutOpen(false),
            }),
            [buttonRef]
        );

        const toggleFlyout = useCallback(() => {
            setIsFlyoutOpen((prev) => !prev);
        }, []);

        const handleDocumentClick = useCallback(
            (event: MouseEvent) => {
                if (
                    flyoutRef.current &&
                    !flyoutRef.current.contains(event.target as Node) &&
                    buttonRef.current &&
                    !(
                        buttonRef.current.Element &&
                        buttonRef.current.Element.contains(event.target as Node)
                    )
                ) {
                    setIsFlyoutOpen(false);
                }
            },
            [flyoutRef]
        );

        useEffect(() => {
            if (isFlyoutOpen) {
                document.addEventListener('mouseup', handleDocumentClick);
            } else {
                document.removeEventListener('mouseup', handleDocumentClick);
            }
            return () => {
                document.removeEventListener('mouseup', handleDocumentClick);
            };
        }, [isFlyoutOpen, handleDocumentClick]);

        const flyoutElement = React.Children.toArray(children).find(
            (child) => React.isValidElement(child) && child.type === DropDownButtonFlyout
        ) as ReactElement<DropDownButtonFlyoutProps> | undefined;

        function isDropDownButtonContent(
            element: ReactNode
        ): element is ReactElement<DropDownButtonContentProps> {
            return React.isValidElement(element) && element.type === DropDownButtonContent;
        }

        function isDropDownButtonImage(
            element: ReactNode
        ): element is ReactElement<DropDownButtonImageProps> {
            return React.isValidElement(element) && element.type === DropDownButtonImage;
        }

        const childrenArray = React.Children.toArray(children);
        const buttonChildren = childrenArray.filter((child) => child !== flyoutElement);

        const mappedButtonChildren = buttonChildren.map((child, index) => {
            const key = React.isValidElement(child) && child.key ? child.key : index;

            if (isDropDownButtonContent(child)) {
                return <Button.Content key={key} {...child.props} />;
            } else if (isDropDownButtonImage(child)) {
                return <Button.Image key={key} {...child.props} />;
            } else if (React.isValidElement(child)) {
                return <React.Fragment key={key}>{child}</React.Fragment>;
            } else {
                return <React.Fragment key={key}>{child}</React.Fragment>;
            }
        });

        return (
            <div className="dropdown-button-container" aria-expanded={isFlyoutOpen} aria-haspopup="menu">
                <Button
                    {...buttonProps}
                    ref={buttonRef}
                    Click={
                        (
                            e: React.MouseEvent<HTMLButtonElement> |
                                React.KeyboardEvent<HTMLButtonElement>
                        ) => {
                            buttonProps.Click && buttonProps.Click(e);
                            toggleFlyout();
                        }
                    }
                    Content={Content}
                    ExtendedContent={[
                        <span className="dropdown-button-icon" key="dropdown-button-icon">
                        <svg
                            className="image after"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 10 7"
                        >
                            <path
                                d="M3 3 L5.5 5 L8 3"
                                strokeLinecap="round"
                                strokeWidth="1"
                                fill="none"
                            />
                        </svg>
                    </span>
                    ]}
                    aria-expanded={isFlyoutOpen}
                    aria-haspopup="menu"
                >
                    {mappedButtonChildren}
                </Button>

                {isFlyoutOpen && (
                    <>
                        <div
                            className="dropdown-button-overlay"
                            onClick={(event) => {
                                event.preventDefault();
                                event.stopPropagation();
                                toggleFlyout();
                            }}
                        />
                        {flyoutElement && (
                            <MenuFlyoutContext.Provider value={{closeFlyout: () => setIsFlyoutOpen(false)}}>
                                <div ref={flyoutRef} className="dropdown-button-flyout">
                                    {flyoutElement}
                                </div>
                            </MenuFlyoutContext.Provider>
                        )}
                    </>
                )}
            </div>
        );
    }
)) as DropDownButtonComponent;

DropDownButton.displayName = 'DropDownButton';
DropDownButton.Flyout = DropDownButtonFlyout;
DropDownButton.Content = DropDownButtonContent;
DropDownButton.Image = DropDownButtonImage;

export default DropDownButton;