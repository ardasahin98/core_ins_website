'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  /** stagger within a group, in ms */
  delay?: number;
  className?: string;
  as?: 'div' | 'section' | 'li' | 'article';
};

/**
 * Reveals its children once, when they first cross into view.
 *
 * Deliberately restrained: it fires a single time and then stops observing,
 * so nothing re-animates when you scroll back up — which is the thing that
 * makes scroll animation feel cheap. Motion is disabled entirely by the
 * prefers-reduced-motion rule in globals.css, and content is visible from
 * the first paint if JavaScript never runs.
 */
export default function Reveal({ children, delay = 0, className = '', as = 'div' }: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      // start the reveal slightly before the element reaches the fold
      { rootMargin: '0px 0px -12% 0px', threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const Tag = as as 'div';

  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
