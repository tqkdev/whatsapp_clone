// app/(auth)/layout.tsx

import type { Metadata } from 'next';
import '../globals.css';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
    title: 'Auth Pages',
    description: 'Authentication related pages',
};

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex relative ">
            {children}
            <Toaster />
        </div>
    );
}
