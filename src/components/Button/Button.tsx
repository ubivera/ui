import React from 'react';

type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
    variant: 'primary' | 'secondary' | 'optional';
};

export default function Button({ className, variant, ...props }: ButtonProps) {
    return <button {...props} className={variant} />;
}