import Link from 'next/link';
import { HiHeart } from 'react-icons/hi2';

export default function FavoritesLinkIcon({
    active,
}: Readonly<{ active: boolean }>) {
    return (
        <Link href="/favorites">
            <button
                className={`rounded-lg p-2.5 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700 ${active ? 'text-gray-600 bg-gray-200 dark:text-gray-50 dark:bg-gray-600' : ''}`}
            >
                <HiHeart className="w-5 h-5" />
            </button>
        </Link>
    );
}
