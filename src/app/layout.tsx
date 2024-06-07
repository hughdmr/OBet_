import "./global.css";
import '@mantine/charts/styles.css';
import "@mantine/core/styles.css";
import React from "react";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { theme } from "../../theme";
import { CollapseDesktop } from "@/components/CollapseDesktop";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OptiBet companion",
  description: "The bet companion",
};


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
      <body className={inter.className}>
        <MantineProvider theme={theme}>
          <CollapseDesktop>
            {children}
          </CollapseDesktop>
        </MantineProvider>
      </body>
    </html>
  );
}
