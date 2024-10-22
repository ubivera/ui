import React, { useRef, useEffect } from 'react';
import { Placement } from '../../../enums';
import FlyoutBase from '../FlyoutBase';
import './styles.scss';

type FlyoutProps = {
    Content?: string | React.ReactNode;
    isOpen?: boolean;
    Placement?: Placement;
    Target?: React.RefObject<HTMLElement>;
    children?: React.ReactNode;
};

const Flyout: React.FC<FlyoutProps> = (props) => {
    const flyoutRef = useRef<HTMLDivElement>(null);
    const base = useRef(new FlyoutBase(props)).current;

    useEffect(() => {
        if (props.isOpen) {
            base.Show();
        } else {
            base.Hide();
        }
    }, [props.isOpen]);

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
        if (props.isOpen) {
            calculatePosition();
        }
    }, [props.isOpen, props.Placement, props.Target]);

    return (
        props.isOpen && (
            <div ref={flyoutRef} className="flyout-content">
                {props.children || base.getContent()}
            </div>
        )
    );
};

export default Flyout;