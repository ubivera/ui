import React, { useRef, useEffect, useState } from 'react';
import { Placement } from '../../../enums';
import FlyoutBase from '../FlyoutBase';
import './styles.scss';

type FlyoutProps = {
    Content?: string | React.ReactNode;
    Open?: boolean;
    Placement?: Placement;
    Target?: React.RefObject<HTMLElement>;
    children?: React.ReactNode;
    OnClose?: () => void;
};

const Flyout: React.FC<FlyoutProps> = (props) => {
    const flyoutRef = useRef<HTMLDivElement>(null);
    const base = useRef(new FlyoutBase(props)).current;

    const [_open, setLocalOpen] = useState<boolean>(props.Open || false);

    const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
        if (flyoutRef.current && !flyoutRef.current.contains(event.target as Node)) {
            base.Hide();

            if (props.OnClose) {
                props.OnClose();
            } else {
                setLocalOpen(false);
            }
        }
    };

    useEffect(() => {
        const flyoutOpen = props.Open !== undefined ? props.Open : _open;

        if (flyoutOpen) {
            document.addEventListener('mousedown', handleOutsideClick);
            document.addEventListener('touchstart', handleOutsideClick);
        } else {
            document.removeEventListener('mousedown', handleOutsideClick);
            document.removeEventListener('touchstart', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
            document.removeEventListener('touchstart', handleOutsideClick);
        };
    }, [props.Open, _open]);

    useEffect(() => {
        if (props.Open !== undefined) {
            if (props.Open) {
                base.Show();
            } else {
                base.Hide();
            }
        } else {
            if (_open) {
                base.Show();
            } else {
                base.Hide();
            }
        }
    }, [props.Open, _open]);

    const calculatePosition = () => {
        if (!props.Target?.current || !flyoutRef.current) return;

        const targetRect = props.Target.current.getBoundingClientRect();
        const flyoutElement = flyoutRef.current;

        switch (props.Placement) {
            case Placement.Top:
                flyoutElement.style.top = `${targetRect.top - flyoutElement.offsetHeight}px`;
                flyoutElement.style.left = `${targetRect.left}px`;
                break;
            case Placement.Bottom:
                flyoutElement.style.top = `${targetRect.bottom}px`;
                flyoutElement.style.left = `${targetRect.left}px`;
                break;
            case Placement.Left:
                flyoutElement.style.top = `${targetRect.top}px`;
                flyoutElement.style.left = `${targetRect.left - flyoutElement.offsetWidth}px`;
                break;
            case Placement.Right:
                flyoutElement.style.top = `${targetRect.top}px`;
                flyoutElement.style.left = `${targetRect.right}px`;
                break;
            case Placement.Full:
                flyoutElement.style.top = `50%`;
                flyoutElement.style.left = `50%`;
                flyoutElement.style.transform = `translate(-50%, -50%)`;
                break;
            case Placement.Auto:
            default:
                flyoutElement.style.top = `${targetRect.bottom}px`;
                flyoutElement.style.left = `${targetRect.left}px`;
                break;
        }
    };

    useEffect(() => {
        if (props.Open || _open) {
            calculatePosition();
        }
    }, [props.Open, _open, props.Placement, props.Target]);

    const flyoutOpen = props.Open !== undefined ? props.Open : _open;

    return (
        flyoutOpen && (
            <div ref={flyoutRef} className="flyout-content">
                {props.children || base.getContent()}
            </div>
        )
    );
};

export default Flyout;