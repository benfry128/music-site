import type { AppProps } from "next/app";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { orange } from "@mui/material/colors";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: orange
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return <ThemeProvider theme={darkTheme}>
    <CssBaseline/>
    <Component {...pageProps} />
  </ThemeProvider>;
}
