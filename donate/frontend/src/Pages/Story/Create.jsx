import React from "react";
import "./StoryCard.scss";



export default function Create() {


  return (
    
      <div className="form-col">
        <div>
          <h2 id="card-title">Pridėti istoriją / idėją</h2>
          <p className="lead">
            Įveskite trumpą istorijos aprašymą, pridėkite nuotrauką ir nurodykite norimą surinkti sumą.
          </p>
        </div>

        <form className="story-form" autoComplete="off">
          <label className="field">
            <span>Istorijos / idėjos tekstas</span>
            <textarea name="story" placeholder="Parašykite čia..." required></textarea>
          </label>

          <label className="field">
            <span>Nuotrauka</span>
            <div className="photo-upload">
              <div className="photo-preview" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M21 19V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12"
                    stroke="#9aa7d8"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21 19H3v2a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-2z"
                    stroke="#9aa7d8"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <label className="file-input-label" htmlFor="photo-input">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 5v14"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5 12h14"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>Pasirinkti failą</span>
                </label>
                <input id="photo-input" type="file" accept="image/*" />
              </div>
            </div>
          </label>

          <label className="field">
            <span>Norima surinkti suma (EUR)</span>
            <input
              className="amount"
              type="number"
              name="goal"
              min="0"
              step="1"
              placeholder="pvz. 1500"
              required
            />
          </label>

          <div className="actions">
            <button type="submit" className="btn primary">
              Patvirtinti
            </button>
            <button type="reset" className="btn secondary">
              Išvalyti
            </button>
          </div>
        </form>
      </div>
  )

}

