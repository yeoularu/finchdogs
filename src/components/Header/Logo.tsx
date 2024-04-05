import Image from 'next/image';
import Link from 'next/link';
import Text from '../Typography/Text';

export default function Logo() {
    return (
        <Link
            href="/home"
            className="flex w-fit items-center justify-center gap-1"
        >
            <Image
                src="/logo.svg"
                width={8}
                height={8}
                alt="Logo"
                className="h-10 w-10 dark:invert"
                priority
            />
            <Text className="text-xl">핀치독스</Text>
        </Link>
    );
}
