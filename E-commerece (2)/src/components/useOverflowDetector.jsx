// hooks/useOverflowDetector.js
import { useEffect, useState, useRef } from 'react';

const isMobile = typeof window !== 'undefined' && window.innerWidth <= 1024;

export const useOverflowDetector = (dependencies = []) => {
    const ref = useRef(null);
    const [isOverflowing, setIsOverflowing] = useState(false);

    const checkOverflow = () => {
        const el = ref.current;
        if (!el) return;

        const hasOverflow =
            el.scrollHeight > el.clientHeight ||
            el.scrollWidth > el.clientWidth ||
            isMobile;

        setIsOverflowing(hasOverflow);
    };

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        // Initial check
        checkOverflow();

        const resizeObserver = new ResizeObserver(() => {
            checkOverflow();
        });

        resizeObserver.observe(el);

        return () => {
            resizeObserver.disconnect();
        };
    }, dependencies); // Pass list, loading, etc. as deps

    return { ref, isOverflowing };
};
