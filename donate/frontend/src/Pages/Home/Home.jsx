// HomePage.jsx

//import StoriesPreview from "../../Components/StoriesPreview";



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
            {/* <StoriesPreview/> */}

            <button>Paaukoti</button>
          </div>
          <div className="story-card">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTarnM-kHjaxxTo2VGhGT5wfnQMPzu9P7I3Nw&s" alt="Vaiko pagalba" />
            <h3>Pagalba vaikams moksluose</h3>
            <p>Padėk vaikams įsigyti mokymosi priemonių ir gauti kokybišką išsilavinimą.</p>
            <button>Paaukoti</button>
          </div>
          <div className="story-card">
            <img src="https://bilis.lt/assets/nuotraukos/_desktop_small/963144/photo-967632333.avif" alt="Gamta" />
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

