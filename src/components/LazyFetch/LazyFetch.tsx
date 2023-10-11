import { useEffect, useRef } from "react";

type Props = {
  onIntersect: () => void;
};

export const LazyFetch = ({ onIntersect }: Props) => {
  const observerRef = useRef<IntersectionObserver>(
    new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.isIntersecting && onIntersect();
      });
    })
  );
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (elRef.current && observerRef.current) {
      observerRef.current.observe(elRef.current);
    }

    return () => {
      observerRef.current && observerRef.current.disconnect();
    };
  }, []);

  return <div ref={elRef} />;
};
