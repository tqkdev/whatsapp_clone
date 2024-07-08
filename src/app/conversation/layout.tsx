import type { Metadata } from 'next';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

config.autoAddCss = false;

export const metadata: Metadata = {
    title: 'Whatsapp 2.0',
    description: 'Generated by Whatsapp',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <div className="h-full">{children}</div>;
}