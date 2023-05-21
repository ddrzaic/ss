import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ThemeOptions, ThemeProvider, createTheme } from "@mui/material/styles";
import { ThemeProvider as SCThemeProvider } from "styled-components";
import { UserProvider } from "@/components/UserProvider/UserProvider";
import { User } from "@/types/common";
import { FavoritesProvider } from "@/components/FavoritesProvider/FavoritesProvider";

const theme = createTheme({
  palette: {
    primary: {
      main: "#b3e5fc",
      white: "#f4fdff",
    },
    secondary: {
      main: "#009688",
    },
    typography: {
      primary: "#000000",
      secondary: "#666666",
    },
  },
} as ThemeOptions);

const mockUser: User = {
  id: 2,
  name: "John Doe",
  email: "user@gmail.com",
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider initUser={mockUser}>
      <FavoritesProvider>
        <SCThemeProvider theme={theme}>
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </SCThemeProvider>
      </FavoritesProvider>
    </UserProvider>
  );
}
