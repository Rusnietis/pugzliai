import React from "react";
import "./StoryCard.scss";

export default function CreateStory() {
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
          <span>Vardas</span>
          <input type="text" name="firstName" placeholder="Įveskite vardą" required />
        </label>

        <label className="field">
          <span>Pavardė</span>
          <input type="text" name="lastName" placeholder="Įveskite pavardę" required />
        </label>

        <label className="field">
          <span>Sukūrimo data</span>
          <input type="date" name="createdAt" required />
        </label>

        <label className="field">
          <span>Istorijos pavadinimas</span>
          <input type="text" name="title" placeholder="Įveskite pavadinimą" required />
        </label>

        <label className="field">
          <span>Istorijos / idėjos tekstas</span>
          <textarea name="story" placeholder="Parašykite čia..." required></textarea>
        </label>

        <label className="field">
          <span>Nuotrauka</span>
          <input type="file" accept="image/*" />
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
  );
}

