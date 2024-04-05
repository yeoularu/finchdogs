'use client';

import { Provider } from 'jotai';

export default function Providers({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return <Provider>{children}</Provider>;
}
