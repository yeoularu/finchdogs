import { useState } from 'react';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi2';

export default function LikeWithCountBtn({
    id,
    isLiked,
    like,
    unlike,
    likeCount,
}: Readonly<{
    id: number;
    isLiked: boolean;
    like: (id: number) => Promise<void>;
    unlike: (id: number) => Promise<void>;
    likeCount: number;
}>) {
    const [isClicked, setIsClicked] = useState(false);

    const handleLike = async (id: number) => {
        try {
            await like(id);
            setIsClicked(true);
        } catch (error) {
            console.error('Like 처리 중 오류 발생', error);
        }
    };

    const handleUnlike = async (id: number) => {
        try {
            await unlike(id);
            setIsClicked(true);
        } catch (error) {
            console.error('Unlike 처리 중 오류 발생', error);
        }
    };
    return (
        <button
            className="mr-auto cursor-pointer"
            onClick={() => (isLiked ? handleUnlike(id) : handleLike(id))}
        >
            <HeartActionBtn
                isLiked={isLiked}
                isClicked={isClicked}
                likeCount={likeCount}
            />
        </button>
    );
}

const HeartActionBtn = ({
    isLiked,
    isClicked,
    likeCount,
}: {
    isLiked: boolean;
    isClicked: boolean;
    likeCount: number;
}) => {
    const textStyle = `block text-sm duration-100 ${isLiked ? '-' : ''}translate-y-1/2`;
    const textAnimation = isLiked ? 'animate-slideDown' : 'animate-slideUp';
    const likedStyle = `text-[rgb(255,91,137)] pointerhover:group-hover:text-pink-500`;
    const unlikedStyle = `text-gray-500 pointerhover:group-hover:text-[rgb(255,91,137)] pointerhover:dark:group-hover:text-[rgb(255,91,137)]`;
    const iconStyle = `w-6 h-6 duration-100 ${isLiked ? likedStyle : unlikedStyle} ${isClicked ? 'animate-likeIcon' : ''}`;

    return (
        <div className={`group flex items-center gap-1 `}>
            {isLiked ? (
                <HiHeart className={iconStyle} />
            ) : (
                <HiOutlineHeart className={iconStyle} />
            )}
            <div className={`flex h-6 flex-col justify-center overflow-hidden`}>
                {isLiked && (
                    <span
                        className={`${textStyle} ${isClicked ? textAnimation : ''} ${unlikedStyle}`}
                    >
                        {likeCount - 1}
                    </span>
                )}
                <span
                    className={`${textStyle} ${isClicked ? textAnimation : ''} ${isLiked ? likedStyle : unlikedStyle}`}
                >
                    {likeCount}
                </span>
                {!isLiked && (
                    <span
                        className={`${textStyle} ${isClicked ? textAnimation : ''} ${likedStyle}`}
                    >
                        {likeCount + 1}
                    </span>
                )}
            </div>
        </div>
    );
};
