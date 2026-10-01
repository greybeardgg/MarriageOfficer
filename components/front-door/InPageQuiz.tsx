'use client';

import { createContext, useCallback, useContext, useState } from 'react';
import { FrontDoor } from './FrontDoor';

const StartContext = createContext<(() => void) | null>(null);

/**
 * The questions, started from the page the visitor is on (Ryan, 1 October
 * 2026). The page's own content is shown until a StartQuiz button is pressed;
 * then the quiz takes the page over, one question per screen under the same
 * chrome, and Back off question one hands the page back.
 */
export function InPageQuiz({ children }: { children: React.ReactNode }) {
  const [started, setStarted] = useState(false);
  const start = useCallback(() => {
    setStarted(true);
    window.scrollTo({ top: 0 });
  }, []);
  const leave = useCallback(() => {
    setStarted(false);
    window.scrollTo({ top: 0 });
  }, []);

  if (started) {
    return (
      <main style={{ position: 'relative', zIndex: 1 }}>
        <FrontDoor inPage autostart onLeave={leave} />
      </main>
    );
  }
  return <StartContext.Provider value={start}>{children}</StartContext.Provider>;
}

/** Starts the questions here, or returns null outside an InPageQuiz. */
export function useStartQuiz(): (() => void) | null {
  return useContext(StartContext);
}

/** The way in, as a button that starts the questions on this page. */
export function StartQuiz({ children, variant = 'ink' }: { children: React.ReactNode; variant?: 'ink' | 'ruled' }) {
  const start = useStartQuiz();
  return (
    <button type="button" className={variant === 'ruled' ? 'act act-ruled' : 'act act-ink'} onClick={start ?? undefined}>
      {children}
    </button>
  );
}
