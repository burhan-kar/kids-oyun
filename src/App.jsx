import React, { useCallback, useEffect, useState } from "react";
import { worlds } from "./data.js";
import { emptyProgress, loadProgress, saveProgress } from "./storage.js";
import { speak } from "./speech.js";
import GameShell from "./components/GameShell.jsx";
import ParentPanel from "./components/ParentPanel.jsx";

export default function App() {
  const [game, setGame] = useState(null);
  const [parentOpen, setParentOpen] = useState(false);
  const [progress, setProgress] = useState(loadProgress);

  useEffect(() => saveProgress(progress), [progress]);

  const completeGame = useCallback((gameName, stars = 3) => {
    setProgress(prev => ({
      ...prev,
      stars: prev.stars + stars,
      sessions: prev.sessions + 1,
      minutesPlayed: prev.minutesPlayed + 2,
      completed: { ...prev.completed, [gameName]: (prev.completed[gameName] || 0) + 1 }
    }));
  }, []);

  if (game) {
    return <GameShell gameId={game} onBack={() => setGame(null)} onComplete={completeGame} />;
  }

  return (
    <main className="app-shell">
      <header className="home-header">
        <div className="logo"><span>🦊</span><b>Minik Kaşif Pro</b></div>
        <div className="header-actions">
          <button className="star-pill">⭐ {progress.stars}</button>
          <button className="parent-button" onClick={() => setParentOpen(true)}>👨‍👩‍👦</button>
        </div>
      </header>

      <section className="welcome">
        <div className="mascot">🐼</div>
        <div>
          <h1>Bugün ne oynayalım?</h1>
          <p>Dokun, sürükle, boya, eşleştir ve keşfet.</p>
        </div>
        <button className="sound-button" onClick={() => speak("Merhaba minik kaşif. Bugün ne oynayalım?")}>🔊</button>
      </section>

      <section className="world-grid">
        {worlds.map(w => (
          <button
            key={w.id}
            className={`world-card ${w.color}`}
            onClick={() => {
              speak(w.title);
              setGame(w.id);
            }}
          >
            <span className="world-icon">{w.icon}</span>
            <span className="world-title">{w.title}</span>
            <small>{w.subtitle}</small>
          </button>
        ))}
      </section>

      <section className="daily">
        <span>🎁</span>
        <div>
          <b>Günün görevi</b>
          <p>İki oyun tamamla ve yıldızları topla.</p>
        </div>
      </section>

      {parentOpen && (
        <ParentPanel
          progress={progress}
          onClose={() => setParentOpen(false)}
          onReset={() => {
            setProgress(emptyProgress);
            setParentOpen(false);
          }}
        />
      )}
    </main>
  );
}
