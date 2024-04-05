'use client';

import isSidebarOpenAtom from '@/atoms/isSidebarOpen';
import Text from '@/components/Typography/Text';
import { Sidebar } from 'flowbite-react';
import { useAtom } from 'jotai';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { HiXMark } from 'react-icons/hi2';

export default function SideNavbar() {
    const [isSidebarOpen, setIsSidebarOpen] = useAtom(isSidebarOpenAtom);
    const router = useRouter();

    const handleClose = () => setIsSidebarOpen(false);

    return (
        <>
            <Sidebar
                aria-label="sidebar"
                hidden={!isSidebarOpen}
                className="fixed top-0 right-0 z-40"
                theme={{
                    root: {
                        inner: 'h-full overflow-y-auto overflow-x-hidden rounded rounded-r-none bg-gray-50 px-3 py-4 dark:bg-gray-800',
                    },
                }}
            >
                <button
                    onClick={handleClose}
                    className="fixed top-0 right-0 mt-2 mr-4 rounded-lg p-2.5 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                >
                    <HiXMark className="w-5 h-5" />
                </button>

                <Sidebar.Items className="mt-10">
                    <Sidebar.ItemGroup>
                        <Sidebar.Item onClick={() => router.push('/about')}>
                            사이트 정보
                        </Sidebar.Item>
                    </Sidebar.ItemGroup>

                    <Sidebar.ItemGroup>
                        <Text className="text-center text-sm text-gray-500">
                            Made by{' '}
                            <Link
                                href="https://github.com/yeoularu"
                                className="underline"
                            >
                                yeoularu
                            </Link>
                        </Text>
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>

            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={handleClose}
                ></div>
            )}
        </>
    );
}
