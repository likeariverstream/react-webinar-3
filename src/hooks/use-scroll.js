import { useRef } from 'react';

export function useScroll() {
  const ref = useRef(null);

  const scrollToRef = (position) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: position });
  };

  return { ref, scrollToRef };
};
