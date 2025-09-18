// StoryCard.jsx
import React from "react";
import "./StoryCard.scss";

export default function StoryCard() {
  return (
    <div >
        <div className="preview-card">
          <div className="preview-photo">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="5" width="18" height="14" rx="2" stroke="#000" strokeWidth="1" />
            </svg>
          </div>
          <div>
            <div className="preview-title">Jūsų būsima istorija</div>
            <div className="preview-body">
              Trumpas aprašymas čia bus rodomas kaip ištrauka. Nuotrauka — viršuje. Kiek norite surinkti: rodoma
              apačioje.
            </div>
          </div>
          <div className="goal">
            <div className="meta">🎯 Tikslas</div>
            <div className="amount-pill">€0</div>
          </div>
        </div>
    </div>
  );
}
