'use client';

import { createContext, useContext } from 'react';

const ThemeContext = createContext('dark');

export function useThemContext(){
    return useContext(ThemeContext);
}

export default function ThemeProvider({ children }: any) {
    return (
        <ThemeContext.Provider value="dark">
            {children}
        </ThemeContext.Provider>
    );
}