// app/(auth)/layout.tsx

import type { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
    title: 'Auth Pages',
    description: 'Authentication related pages',
};

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <div className="flex relative ">{children}</div>;
}
