import { Post } from '@/types/post';
import { atom } from 'jotai';

const realtimePostsAtom = atom<Post[]>([]);
export default realtimePostsAtom;
