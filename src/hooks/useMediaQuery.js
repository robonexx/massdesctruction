import { useCallback, useSyncExternalStore } from 'react';

export const useMediaQuery = (query) => {
  const subscribe = useCallback((onChange) => {
    const media = window.matchMedia(query);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, [query]);

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
};

export const useIsDesktop = () => useMediaQuery('(min-width: 768px)');
