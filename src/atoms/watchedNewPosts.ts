import { atom } from 'jotai';

const watchedNewPosts = atom<number[]>([]);

export default watchedNewPosts;
