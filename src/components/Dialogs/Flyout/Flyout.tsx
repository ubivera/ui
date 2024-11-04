import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Placement as PlacementEnum } from '../../../enums';
import './Flyout.scss';

interface FlyoutProps {
    IsOpen?: boolean;
    Target?: React.RefObject<HTMLElement>;
    Placement?: PlacementEnum;
    AreOpenCloseAnimationsEnabled?: boolean;
    AllowFocusOnInteraction?: boolean;
    children?: React.ReactNode;
}

export interface FlyoutRef {
    Show: () => void;
    Hide: () => void;
}

const Flyout = forwardRef<FlyoutRef, FlyoutProps>(({
    IsOpen = false,
    Target,
    Placement = PlacementEnum.Auto,
    AreOpenCloseAnimationsEnabled = true,
    AllowFocusOnInteraction = true,
    children
}, ref) => {
    const [isOpen, setIsOpen] = useState(IsOpen);
    const [shouldRender, setShouldRender] = useState(IsOpen);
    const flyoutRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
        Show: () => setIsOpen(true),
        Hide: () => setIsOpen(false),
    }));

    useEffect(() => {
        if (isOpen) {
            setShouldRender(true);
        } else if (AreOpenCloseAnimationsEnabled) {
            const timer = setTimeout(() => setShouldRender(false), 300);
            return () => clearTimeout(timer);
        } else {
            setShouldRender(false);
        }
    }, [isOpen, AreOpenCloseAnimationsEnabled]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
        };

        const handleClickOutside = (event: MouseEvent) => {
            if (flyoutRef.current && !flyoutRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const overlayStyle: React.CSSProperties = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'transparent',
        zIndex: 999,
    };

    const getFlyoutPosition = () => {
        if (!Target?.current) return {};

        const targetRect = Target.current.getBoundingClientRect();
        const flyoutStyle: React.CSSProperties = { position: 'absolute' };

        switch (Placement) {
            case PlacementEnum.Top:
                flyoutStyle.top = `${targetRect.top - flyoutRef.current!.offsetHeight}px`;
                flyoutStyle.left = `${targetRect.left}px`;
                break;
            case PlacementEnum.Bottom:
                flyoutStyle.top = `${targetRect.bottom}px`;
                flyoutStyle.left = `${targetRect.left}px`;
                break;
            case PlacementEnum.Left:
                flyoutStyle.top = `${targetRect.top}px`;
                flyoutStyle.left = `${targetRect.left - flyoutRef.current!.offsetWidth}px`;
                break;
            case PlacementEnum.Right:
                flyoutStyle.top = `${targetRect.top}px`;
                flyoutStyle.left = `${targetRect.right}px`;
                break;
            case PlacementEnum.Full:
                flyoutStyle.top = '0px';
                flyoutStyle.left = '0px';
                flyoutStyle.width = '100vw';
                flyoutStyle.height = '100vh';
                break;
            case PlacementEnum.TopEdgeAlignedLeft:
                flyoutStyle.top = `${targetRect.top - flyoutRef.current!.offsetHeight}px`;
                flyoutStyle.left = `${targetRect.left}px`;
                break;
            case PlacementEnum.TopEdgeAlignedRight:
                flyoutStyle.top = `${targetRect.top - flyoutRef.current!.offsetHeight}px`;
                flyoutStyle.left = `${targetRect.right - flyoutRef.current!.offsetWidth}px`;
                break;
            case PlacementEnum.BottomEdgeAlignedLeft:
                flyoutStyle.top = `${targetRect.bottom}px`;
                flyoutStyle.left = `${targetRect.left}px`;
                break;
            case PlacementEnum.BottomEdgeAlignedRight:
                flyoutStyle.top = `${targetRect.bottom}px`;
                flyoutStyle.left = `${targetRect.right - flyoutRef.current!.offsetWidth}px`;
                break;
            case PlacementEnum.LeftEdgeAlignedTop:
                flyoutStyle.top = `${targetRect.top}px`;
                flyoutStyle.left = `${targetRect.left - flyoutRef.current!.offsetWidth}px`;
                break;
            case PlacementEnum.LeftEdgeAlignedBottom:
                flyoutStyle.top = `${targetRect.bottom - flyoutRef.current!.offsetHeight}px`;
                flyoutStyle.left = `${targetRect.left - flyoutRef.current!.offsetWidth}px`;
                break;
            case PlacementEnum.RightEdgeAlignedTop:
                flyoutStyle.top = `${targetRect.top}px`;
                flyoutStyle.left = `${targetRect.right}px`;
                break;
            case PlacementEnum.RightEdgeAlignedBottom:
                flyoutStyle.top = `${targetRect.bottom - flyoutRef.current!.offsetHeight}px`;
                flyoutStyle.left = `${targetRect.right}px`;
                break;
            case PlacementEnum.Auto:
            default:
                flyoutStyle.top = `${targetRect.bottom}px`;
                flyoutStyle.left = `${targetRect.left}px`;
                break;
        }

        return flyoutStyle;
    };

    const flyoutStyle: React.CSSProperties = {
        position: 'absolute',
        zIndex: 1000,
        ...getFlyoutPosition()
    };

    if (!shouldRender) return null;

    return (
        <>
            {AllowFocusOnInteraction && <div style={overlayStyle} onClick={() => setIsOpen(false)} />}
            <div
                ref={flyoutRef}
                tabIndex={-1}
                className={`flyout${AreOpenCloseAnimationsEnabled ? (isOpen ? ' flyout-open' : ' flyout-close') : ''}`}
                style={flyoutStyle}
            >
                {children}
            </div>
        </>
    );
});

Flyout.displayName = 'Flyout';
export default Flyout;