import React, { useEffect, useRef } from "react";
import Phaser from "phaser";
import { createGameConfig } from "../game/config.js";

export default function GameShell({ gameId, onBack, onComplete }) {
  const hostRef = useRef(null);
  const gameRef = useRef(null);

  useEffect(() => {
    if (!hostRef.current) return;
    gameRef.current = new Phaser.Game(createGameConfig(hostRef.current, gameId, onComplete));

    return () => {
      gameRef.current?.destroy(true);
      gameRef.current = null;
    };
  }, [gameId, onComplete]);

  return (
    <main className="game-page">
      <header className="game-toolbar">
        <button className="circle-button" onClick={onBack}>←</button>
        <strong>Minik Kaşif Pro</strong>
        <button className="circle-button" onClick={() => window.location.reload()}>↻</button>
      </header>
      <div className="phaser-host" ref={hostRef} />
    </main>
  );
}
