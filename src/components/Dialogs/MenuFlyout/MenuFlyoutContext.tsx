import React from 'react';

export const MenuFlyoutContext = React.createContext<{ closeFlyout: () => void } | undefined>(
    undefined
);