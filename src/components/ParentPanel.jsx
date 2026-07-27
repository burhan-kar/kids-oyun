import React from "react";

export default function ParentPanel({ progress, onClose, onReset }) {
  const games = Object.entries(progress.completed || {});
  const totalCompleted = games.reduce((a, [, b]) => a + b, 0);

  return (
    <div className="modal-backdrop">
      <section className="parent-panel">
        <button className="circle-button close" onClick={onClose}>✕</button>
        <h2>👨‍👩‍👦 Ebeveyn Paneli</h2>

        <div className="metric-grid">
          <div className="metric"><b>{progress.stars}</b><span>Yıldız</span></div>
          <div className="metric"><b>{progress.sessions}</b><span>Oturum</span></div>
          <div className="metric"><b>{totalCompleted}</b><span>Tamamlanan</span></div>
          <div className="metric"><b>{Math.max(1, progress.minutesPlayed)}</b><span>Dakika</span></div>
        </div>

        <h3>Oyun kayıtları</h3>
        <div className="progress-list">
          {games.length === 0 && <p>Henüz oyun tamamlanmadı.</p>}
          {games.map(([name, count]) => (
            <div className="progress-row" key={name}>
              <span>{name}</span>
              <strong>{count} kez</strong>
            </div>
          ))}
        </div>

        <button className="danger" onClick={onReset}>İlerlemeyi sıfırla</button>
      </section>
    </div>
  );
}
