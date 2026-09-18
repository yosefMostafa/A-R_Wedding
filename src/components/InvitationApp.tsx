'use client';

import { AnimatePresence } from 'framer-motion';
import { useCallback, useState } from 'react';
import { Envelope } from './Envelope';
import { Invitation } from './Invitation';
import { MusicToggle } from './MusicToggle';
import { Particles } from './Particles';

/* closed → (tap, flap opens inside Envelope) → opened (envelope exits) → revealed (card mounts) */
type Stage = 'closed' | 'opened' | 'revealed';

export function InvitationApp() {
  const [stage, setStage] = useState<Stage>('closed');
  const [musicOn, setMusicOn] = useState(false);

  const onOpened = useCallback(() => setStage('opened'), []);
  const onRevealed = useCallback(() => {
    window.scrollTo(0, 0);
    setStage('revealed');
    setMusicOn(true);
  }, []);

  return (
    <>
      <div className="bg-damask" aria-hidden />
      <Particles />

      <AnimatePresence onExitComplete={onRevealed}>
        {stage === 'closed' && <Envelope key="envelope" onOpened={onOpened} />}
      </AnimatePresence>

      {stage === 'revealed' && <Invitation />}

      <MusicToggle visible={stage === 'revealed'} playing={musicOn} onToggle={() => setMusicOn((v) => !v)} />
    </>
  );
}
