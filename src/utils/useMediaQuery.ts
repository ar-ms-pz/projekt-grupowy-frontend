import { useState, useEffect } from 'react';

export const useMediaQuery = (breakpoint: number) => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);
        const updateMatches = () => setMatches(mediaQuery.matches);

        updateMatches();

        mediaQuery.addEventListener('change', updateMatches);

        return () => {
            mediaQuery.removeEventListener('change', updateMatches);
        };
    }, [breakpoint]);

    return matches;
};
