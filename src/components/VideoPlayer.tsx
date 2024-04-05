import { MediaPlayer, MediaProvider } from '@vidstack/react';
import {
    DefaultVideoLayout,
    defaultLayoutIcons,
} from '@vidstack/react/player/layouts/default';

export default function VideoPlayer({
    src,
    title,
}: Readonly<{
    src: string;
    title: string;
}>) {
    return (
        <MediaPlayer title={title} src={src} playsInline>
            <MediaProvider />
            <DefaultVideoLayout icons={defaultLayoutIcons} />
        </MediaPlayer>
    );
}
