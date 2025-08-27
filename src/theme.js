// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',  // Azul
    },
    secondary: {
      main: '#19857b',  // Verde
    },
    error: {
      main: '#ff4444',  // Rojo
    },
    background: {
      default: '#fff',
      paper: '#f4f4f4',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    h1: {
      fontSize: '2.2rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
    },
  },
});

export default theme;
