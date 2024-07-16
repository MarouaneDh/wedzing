import ThemeContext from './ThemeContext';

const ThemeProvider = ({ children }) => {
    const theme = {
        text: {
            color: '#000',
            fontSize: 18,
        },
        primary: '#3498db',
        secondary: '#2ecc71',
        background: '#ecf0f1',
    }

    return (
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
