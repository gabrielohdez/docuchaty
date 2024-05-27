// pages/_app.js
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import '../styles/globals.css';  // Importar el archivo de estilos globales
import Script from 'next/script';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0070f3',
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"
        strategy="beforeInteractive"
      />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
