// HomePage.jsx
import React from "react";


export default function HomePage() {
  return (
    <div className="homepage">
      {/* Hero sekcija */}
      <section className="hero">
        <div className="hero-content">
          <h1>Padėkime kartu</h1>
          <p>
            Prisidėk prie įvairių kilnių iniciatyvų — nuo sveikatos pagalbos iki gamtosaugos.
            Kiekviena tavo auka prisideda prie geresnio rytojaus.
          </p>
          <button className="cta">Prisidėti dabar</button>
        </div>
      </section>

      {/* Apie mus */}
      <section className="about">
        <h2>Apie mus</h2>
        <p>
          Mes tikime, kad bendruomenė gali pakeisti pasaulį. Mūsų platforma leidžia lengvai
          paremti įvairias istorijas, kuriose žmonėms ar organizacijoms reikia pagalbos.
        </p>
      </section>

      {/* Kaip tai veikia */}
      <section className="steps">
        <h2>Kaip tai veikia?</h2>
        <div className="step-list">
          <div className="step">
            <span className="number">1</span>
            <p>Pasirink istoriją ar idėją</p>
          </div>
          <div className="step">
            <span className="number">2</span>
            <p>Paskirk norimą auką</p>
          </div>
          <div className="step">
            <span className="number">3</span>
            <p>Stebėk progresą ir rezultatus</p>
          </div>
        </div>
      </section>

      {/* Istorijų sąrašas */}
      <section className="stories">
        <h2>Istorijos</h2>
        <div className="story-grid">
          <div className="story-card">
            <img src="https://picsum.photos/400/240?random=1" alt="Katės pagalba" />
            <h3>Pagalba beglobiams gyvūnams</h3>
            <p>Prisidėk prie prieglaudos, kuri rūpinasi šimtais kačių ir šunų kasmet.</p>
            <button>Paaukoti</button>
          </div>
          <div className="story-card">
            <img  src="https://picsum.photos/400/240?random=2" alt="Vaiko pagalba" />
            <h3>Pagalba vaikams moksluose</h3>
            <p>Padėk vaikams įsigyti mokymosi priemonių ir gauti kokybišką išsilavinimą.</p>
            <button>Paaukoti</button>
          </div>
          <div className="story-card">
            <img src="https://picsum.photos/400/240?random=4"  alt="Gamta" />
            <h3>Miško atkūrimo iniciatyva</h3>
            <p>Sodinkime medžius kartu ir kurkime švaresnę bei žalesnę aplinką ateities kartoms.</p>
            <button>Paaukoti</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} Padėkime Kartu. Visos teisės saugomos.</p>
      </footer>
    </div>
  );
}

