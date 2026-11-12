import type { Metadata } from 'next';
import localFont from 'next/font/local';

import './globals.css';
import { Footer } from '@/components/Footer';

const shantellSans = localFont({
    src: [
        {
            path: '../../public/fonts/ShantellSans-VariableFont_BNCE,INFM,SPAC,wght.ttf',
            style: 'normal',
        },
        {
            path: '../../public/fonts/ShantellSans-Italic-VariableFont_BNCE,INFM,SPAC,wght.ttf',
            style: 'italic',
        },
    ],
    variable: '--font-shantellSans',
});

export const metadata: Metadata = {
    title: 'Artisan Graffito',
    description:
        'Cette application web permet de dessiner facilement sur le navigateur.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
    return (
        <html
            lang="en"
            className={`${shantellSans.variable} h-full antialiased`}
        >
            <body className="font-primary flex h-full max-h-full flex-col overflow-scroll bg-gray-100">
                {children}
                <Footer />
            </body>
        </html>
    );
}
