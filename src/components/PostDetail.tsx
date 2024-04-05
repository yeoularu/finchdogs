'use client';

import { Post } from '@/types/post';
import { getKoreanFormat } from '@/utils/dayjs';
import { Button } from 'flowbite-react';
import Link from 'next/link';
import ImageAutoRatio from './ImageAutoRatio';
import LikeWithCountBtn from './Like/LikeWithCountBtn';
import SourceAvatar from './SourceAvatar';
import Headline from './Typography/Headline';
import Text from './Typography/Text';
import VideoPlayer from './VideoPlayer';

export default function PostDetail({
    id,
    title,
    content,
    fromNow,
    inserted_at,
    media_type,
    media_link,
    og_source,
    og_link,
    keywords,
    like_count,
    isLiked,
    like,
    unlike,
}: Readonly<Post> & {
    isLiked: boolean;
    like: (id: number) => Promise<void>;
    unlike: (id: number) => Promise<void>;
}) {
    return (
        <section className="max-w-2xl flex flex-col gap-4">
            <Link href={`/sources/${encodeURIComponent(og_source ?? '')}`}>
                <div className="flex flex-wrap items-center gap-2">
                    <SourceAvatar og_source={og_source} />

                    <Text>{og_source}</Text>
                    <Text className="text-sm">
                        {fromNow} - {getKoreanFormat(inserted_at)}
                    </Text>
                </div>
            </Link>

            <Headline>{title}</Headline>
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
            <Text>{content}</Text>
            <div className="flex justify-between">
                <LikeWithCountBtn
                    id={id}
                    isLiked={isLiked}
                    likeCount={like_count}
                    like={like}
                    unlike={unlike}
                />
                {og_link && (
                    <Link href={og_link}>
                        <Button>원문 보기</Button>
                    </Link>
                )}
                {keywords && (
                    <Link href={`https://news.google.com/search?q=${keywords}`}>
                        <Button>관련 뉴스 검색</Button>
                    </Link>
                )}
            </div>
        </section>
    );
}
