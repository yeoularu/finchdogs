import { atom } from "jotai";

const likeCountAtom = atom(new Map<number, number>());

export default likeCountAtom;
