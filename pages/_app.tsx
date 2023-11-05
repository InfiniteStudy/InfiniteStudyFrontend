import "../styles/globals.css";
import type {AppProps} from "next/app";
import {Analytics} from "@vercel/analytics/react";
import {createTheme, NextUIProvider} from "@nextui-org/react";
import {ThemeProvider as NextThemesProvider} from "next-themes";
import {HydrationProvider, Server, Client} from "react-hydration-provider";
import React from "react";

const lightTheme = createTheme({
    type: 'light',
    theme: {
        colors: {},
    },
});

const darkTheme = createTheme({
    type: 'dark',
    theme: {
        colors: {},
    },
});

interface UserContextType {
    userID: number | null;
    setUserID: React.Dispatch<React.SetStateAction<number | null>>;
}

function MyApp({Component, pageProps}: AppProps) {

    return (
        <HydrationProvider>
            <NextThemesProvider
                defaultTheme="system"
                attribute="class"
                value={{
                    light: lightTheme.className,
                    dark: darkTheme.className,
                }}
            >
                <NextUIProvider>
                    <Component {...pageProps} />
                </NextUIProvider>
                <Analytics/>
            </NextThemesProvider>
        </HydrationProvider>
    );
}

export default MyApp;
