import "@/assets/styles/globals.scss";
import "@/assets/styles/_variables.scss";

import type { Metadata } from "next";
import { Providers } from "./providers";

export const metadata: Metadata = {
    title: "KazInvestEngineering",
    description: "KazInvestEngineering test app",
};

interface RootLayoutProps {
    children: React.ReactNode;
};

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
    return (
        <html lang="en">
            <body>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
