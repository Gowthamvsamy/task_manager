import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {

    // Theme
    const [theme, setTheme] = useState('light');

    // Task Form
    const [open, setOpen] = useState(false);

    // Employee form
    const [empForm, setEmpForm] = useState(false)

    // Toggletheme
    const toggleTheme = () => {
        setTheme(prevMode =>  prevMode === 'light' ? 'dark' : 'light');
    };

    return (
        <>
            {/* Theme Provider */}
            <ThemeContext.Provider value={{ theme, toggleTheme, open, setOpen, empForm, setEmpForm }}>
                {children}
            </ThemeContext.Provider>
        </>
    );
};

export { ThemeContext };