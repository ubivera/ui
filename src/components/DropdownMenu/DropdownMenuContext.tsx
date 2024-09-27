import React, { useContext, useEffect, useRef } from 'react';
import DropdownContext from './DropdownMenu';

const DropdownMenuContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
    const { isOpen, closeDropdown } = useContext(DropdownContext);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (contentRef.current && !contentRef.current.contains(event.target as Node)) {
                closeDropdown();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, closeDropdown]);

    if (!isOpen) {
        return null;
    }

    return (
        <div ref={contentRef} {...props}>
            {children}
        </div>
    );
};

export default DropdownMenuContent;
