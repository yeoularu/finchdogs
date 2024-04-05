import { useMotionValueEvent, useScroll } from 'framer-motion';
import { useState } from 'react';

export default function useScrollDirection() {
    const { scrollY } = useScroll();
    const [lastY, setLastY] = useState(0);
    const [isScrollingDown, setIsScrollingDown] = useState(false);
    const minDelta = 10;

    useMotionValueEvent(scrollY, 'change', (latest) => {
        const delta = latest - lastY;
        if (Math.abs(delta) >= minDelta) {
            setIsScrollingDown(delta > 0);
            setLastY(latest);
        }
    });

    return isScrollingDown;
}
