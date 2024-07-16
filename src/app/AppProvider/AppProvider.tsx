'use client';
import { createContext, useContext, useState } from 'react';

const AppContext = createContext({
    accessToken: '',
});

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};

export default function AppProvider({
    children,
    inititalaccessToken = '',
}: {
    children: React.ReactNode;
    inititalaccessToken?: string;
}) {
    const [accessToken] = useState(inititalaccessToken);
    return <AppContext.Provider value={{ accessToken }}>{children}</AppContext.Provider>;
}
