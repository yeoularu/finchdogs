'use client';

import isSidebarOpenAtom from '@/atoms/isSidebarOpen';
import FavoritesLinkIcon from '@/components/Header/FavoritesLinkIcon';
import Logo from '@/components/Header/Logo';
import useScrollDirection from '@/hooks/useScrollDirection';
import { DarkThemeToggle } from 'flowbite-react';
import { MotionValue, useScroll } from 'framer-motion';
import { useSetAtom } from 'jotai';
import { usePathname } from 'next/navigation';
import { HiBars3 } from 'react-icons/hi2';

function getHeaderClassName(
    isScrollingDown: boolean,
    scrollY: MotionValue<number>,
) {
    const y = scrollY.get();

    let className =
        'z-10 sticky top-0 flex w-full justify-between px-4 py-2 duration-300 border-b-2 border-b-gray-200 dark:border-b-gray-700';
    if (isScrollingDown && y > 0) {
        className +=
            ' opacity-20 bg-opacity-0 dark:bg-opacity-0 border-b-transparent dark:border-b-transparent';
    }
    if (y > 10) {
        className += ' bg-white dark:bg-gray-900';
    } else {
        className += ' border-b-transparent dark:border-b-transparent';
    }
    return className;
}

export default function Header() {
    const setSidebarOpen = useSetAtom(isSidebarOpenAtom);
    const toggleSidebar = () => setSidebarOpen((prev) => !prev);
    const pathname = usePathname();
    const active = pathname === '/favorites';
    const { scrollY } = useScroll();
    const isScrollingDown = useScrollDirection();

    const headerClassName = getHeaderClassName(isScrollingDown, scrollY);

    return (
        <header className={headerClassName}>
            <Logo />
            <div className="flex gap-2">
                <FavoritesLinkIcon active={active} />
                <DarkThemeToggle />
                <button
                    onClick={toggleSidebar}
                    className={`rounded-lg p-2.5 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700`}
                >
                    <HiBars3 className="w-5 h-5" />
                </button>
            </div>
        </header>
    );
}
