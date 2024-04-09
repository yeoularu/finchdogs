import { atom } from 'jotai';
import realtimePostsAtom from './realtimePosts';
import viewedNewPostIdsAtom from './viewedNewPostIds';

const unviewedNewPostIdsAtom = atom<number[]>((get) => {
    const posts = get(realtimePostsAtom);
    const viewed = get(viewedNewPostIdsAtom);
    return posts.map(({ id }) => id).filter((id) => !viewed.includes(id));
});

export default unviewedNewPostIdsAtom;
