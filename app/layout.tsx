import "./globals.scss";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SuperTokensInit } from "./components/supertokens-wrapper";
import { ensureSuperTokensInit } from "./config/supertokens/backend";

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
    title: "SuperTokens 💫",
    description: "SuperTokens demo app",
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <SuperTokensInit>
                <body className={inter.className}>
                    <>{children}</>
                </body>
            </SuperTokensInit>
        </html>
    );
}
