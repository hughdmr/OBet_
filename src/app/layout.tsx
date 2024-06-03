import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import '@mantine/core/styles.css';
import { MantineProvider, ColorSchemeScript, createTheme } from '@mantine/core';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OptiBet companion",
  description: "The bet companion",
}

const theme = createTheme({
  /** Put your mantine theme override here */
});

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme}>{children}</MantineProvider>
      </body>
    </html>
  );
}
