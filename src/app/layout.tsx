import Header from '@/features/Header';
import SideNavbar from '@/features/SideNavbar';
import '@vidstack/react/player/styles/default/layouts/video.css';
import '@vidstack/react/player/styles/default/theme.css';
import { Flowbite, ThemeModeScript } from 'flowbite-react';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import NextTopLoader from 'nextjs-toploader';
import { useToggle } from 'usehooks-ts';
import './globals.css';
import Providers from './providers';

const pretendard = localFont({
    src: [
        {
            path: '../styles/fonts/Pretendard-Regular.subset.woff2',
            weight: '400',
        },
        {
            path: '../styles/fonts/Pretendard-SemiBold.subset.woff2',
            weight: '600',
        },
    ],
});

export const metadata: Metadata = {
    title: '핀치독스 - 실시간 해외 경제 뉴스 & 트렌드',
    description:
        '해외 경제 뉴스와 커뮤니티 트렌드를 요약/번역해 제공합니다. 새로고침 없이 항상 최신 정보가 업데이트 됩니다.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Providers>
            <html lang="ko" className={`${pretendard.className}`}>
                <head>
                    <ThemeModeScript />
                </head>
                <body className="bg-gray-50 dark:bg-gray-900">
                    <NextTopLoader showSpinner={false} />
                    <Flowbite>
                        <Header />
                        <SideNavbar />

                        <main>{children}</main>
                    </Flowbite>
                </body>
            </html>
        </Providers>
    );
}
