import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {

    // Theme
    const [theme, setTheme] = useState(true);

    // Task Form
    const [open, setOpen] = useState(false);

    // Toggletheme
    const toggleTheme = () => {
        setTheme(prevMode => !prevMode);
    };

    return (
        <>
            {/* Theme Provider */}
            <ThemeContext.Provider value={{ theme, toggleTheme, open, setOpen }}>
                {children}
            </ThemeContext.Provider>
        </>
    );
};

export { ThemeContext };