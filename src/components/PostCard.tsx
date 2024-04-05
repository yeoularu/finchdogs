import { Post } from '@/types/post';
import { Card } from 'flowbite-react';
import Link from 'next/link';
import ImageAutoRatio from './ImageAutoRatio';
import LikeWithCountBtn from './Like/LikeWithCountBtn';
import SourceAvatar from './SourceAvatar';
import Headline from './Typography/Headline';
import Text from './Typography/Text';
import VideoPlayer from './VideoPlayer';

export default function PostCard({
    id,
    title,
    content,
    fromNow,
    media_type,
    media_link,
    og_source,
    like_count,
    isReadMoreActive,
    readMore,
    isLiked,
    like,
    unlike,
}: Readonly<
    Post & {
        isReadMoreActive: boolean;
        readMore: () => void;
        isLiked: boolean;
        like: (id: number) => Promise<void>;
        unlike: (id: number) => Promise<void>;
    }
>) {
    const lineClamp = !isReadMoreActive;

    return (
        <Card className="max-w-2xl">
            <Link href={`/sources/${encodeURIComponent(og_source ?? '')}`}>
                <div className="flex items-center gap-2">
                    <SourceAvatar og_source={og_source} />

                    <Text>{og_source}</Text>
                    <Text>{fromNow}</Text>
                </div>
            </Link>
            <Link href={`/posts/${id}`}>
                <Headline>{title}</Headline>
            </Link>
            {media_link && (
                <div className="flex items-center justify-center gap-2">
                    {media_type === 'image' && (
                        <ImageAutoRatio src={media_link} alt={title} />
                    )}

                    {media_type === 'video' && (
                        <VideoPlayer src={media_link} title={title} />
                    )}

                    {media_type === 'link' && (
                        <div className="flex w-fit flex-col">
                            <Text className="text-sm">링크된 컨텐츠:</Text>
                            <Link href={media_link}>
                                <p className="break-all text-sm text-blue-600 decoration-solid underline-offset-2 hover:underline dark:text-blue-400">
                                    {media_link}
                                </p>
                            </Link>
                        </div>
                    )}
                </div>
            )}

            <Link href={`/posts/${id}`}>
                <Text
                    className={`max-h-40 transition-all duration-500 dark:text-gray-300 ${lineClamp ? 'line-clamp-6' : 'line-clamp-[100] max-h-[100rem]'}`}
                >
                    {content}
                </Text>
            </Link>

            {lineClamp && (
                <button className="mr-auto cursor-pointer" onClick={readMore}>
                    <span className="decoration-600 dark:decoration-400 inline font-semibold text-gray-600 decoration-solid underline-offset-2 hover:underline dark:text-gray-400">
                        더 보기
                    </span>
                </button>
            )}

            <LikeWithCountBtn
                id={id}
                isLiked={isLiked}
                likeCount={like_count}
                like={like}
                unlike={unlike}
            />
        </Card>
    );
}
