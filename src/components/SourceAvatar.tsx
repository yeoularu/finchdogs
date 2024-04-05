import Image from 'next/image';

export default function SourceAvatarImage({
    og_source,
    className = '',
}: Readonly<{ og_source: string | undefined; className?: string }>) {
    return (
        <Image
            alt={og_source ?? 'Unknown'}
            width={32}
            height={32}
            referrerPolicy="no-referrer"
            src={`/${og_source}.webp`}
            className={`rounded ${className}`}
        />
    );
}
