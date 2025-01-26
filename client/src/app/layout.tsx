import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';

const openSans = Open_Sans({
    variable: '--font-open-sans',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Todo App',
    description: 'Todo app take-home task for Nooro',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body className={`${openSans.variable} antialiased`}>
                <Header />
                <div className='w-full max-w-[750px] min-w-[250px] relative'>{children}</div>
            </body>
        </html>
    );
}
