'use client';

import isSidebarOpenAtom from '@/atoms/isSidebarOpen';
import unviewedNewPostIdsAtom from '@/atoms/unviewedNewPostIds';
import FavoritesLinkIcon from '@/components/Header/FavoritesLinkIcon';
import Logo from '@/components/Header/Logo';
import Text from '@/components/Typography/Text';
import useScrollDirection from '@/hooks/useScrollDirection';
import { DarkThemeToggle, Tooltip } from 'flowbite-react';
import { MotionValue, motion, useScroll } from 'framer-motion';
import { useAtomValue, useSetAtom } from 'jotai';
import { usePathname, useRouter } from 'next/navigation';
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
            ' opacity-20 bg-opacity-0 dark:bg-opacity-0 border-b-transparent dark:border-b-transparent hover:opacity-100 hover:bg-opacity-100 dark:hover:bg-opacity-100 hover:border-b-gray-200 dark:hover:border-b-gray-700';
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
    const isHome = pathname === '/home';
    const isFavorites = pathname === '/favorites';
    const { scrollY } = useScroll();
    const isScrollingDown = useScrollDirection();
    const router = useRouter();
    const headerClassName = getHeaderClassName(isScrollingDown, scrollY);
    const unviewedPosts = useAtomValue(unviewedNewPostIdsAtom);

    const handleClickNewPosts = () => {
        if (!isHome) return router.push('/home');
        if (isHome && scrollY.get() > 10)
            return scrollTo({
                top: 0,
                behavior: 'smooth',
            });
    };

    return (
        <header className={headerClassName}>
            <Logo />

            {unviewedPosts.length > 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center justify-center"
                >
                    <Tooltip
                        content="새로운 글"
                        placement="bottom"
                        arrow={false}
                    >
                        <button
                            className="flex items-center gap-1"
                            onClick={handleClickNewPosts}
                        >
                            <div className="w-2 h-2 bg-blue-500 rounded-full" />
                            <Text className="text-sm">
                                {unviewedPosts.length}
                            </Text>
                        </button>
                    </Tooltip>
                </motion.div>
            )}

            <div className="flex gap-2">
                <FavoritesLinkIcon active={isFavorites} />
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
