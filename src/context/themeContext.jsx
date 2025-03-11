import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({children}) => {

    const [theme, setTheme] = useState(false);

    const toggleTheme = () => {
        setTheme(prevMode => !prevMode);
    };

    return(
        <>
            <ThemeContext.Provider value={{theme, toggleTheme}}>
                {children}
            </ThemeContext.Provider>
        </>
    );
};

export {ThemeContext};