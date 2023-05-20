import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ThemeProvider as SCThemeProvider } from "styled-components";
const theme = createTheme({
  palette: {
    primary: {
      main: "#b3e5fc",
      white: "#f4fdff",
    },
    secondary: {
      main: "#009688",
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SCThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </SCThemeProvider>
  );
}
