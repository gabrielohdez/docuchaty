// pages/_app.js
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import '../styles/globals.css';  // Importar el archivo de estilos globales

const theme = createTheme({
  palette: {
    primary: {
      main: '#0070f3',
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
