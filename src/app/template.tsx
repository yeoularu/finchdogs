'use client';

import isSidebarOpenAtom from '@/atoms/isSidebarOpen';
import useRealtimePosts from '@/hooks/useRealtimePosts';
import { useSetAtom } from 'jotai';

export default function Template({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    useRealtimePosts();
    const setIsSidebarOpen = useSetAtom(isSidebarOpenAtom);

    setIsSidebarOpen(false);

    return <>{children}</>;
}
