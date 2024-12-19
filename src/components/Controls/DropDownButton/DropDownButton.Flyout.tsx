import React, {ReactNode} from 'react';

export interface DropDownButtonFlyoutProps {
    children: ReactNode;
}

const DropDownButtonFlyout: React.FC<DropDownButtonFlyoutProps> = ({children}) => {
    return <>{children}</>
};

DropDownButtonFlyout.displayName = 'DropDownButtonFlyout';
export default React.memo(DropDownButtonFlyout);