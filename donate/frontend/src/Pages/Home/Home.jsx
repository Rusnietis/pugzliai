import { useContext } from "react";
import { Stories } from "../../Contexts/Stories";
import { Link } from "react-router-dom";


//import StoriesPreview from "../../Components/StoriesPreview";



export default function Home() {

  const { stories } = useContext(Stories);
  console.log(stories)
  // Jeigu dar neužkrautos istorijos
  if (!stories) {
    return <div className="loading">Kraunama...</div>;
  }

  // Rodyti tik 3 naujausias istorijas
  const latestStories = stories.slice(0, 3);

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
          {latestStories.map((story) => (
            <div className="story-card" key={story.id}>
              <img src={story.image} alt={story.title} className="story-image" />

              <div className="story-info">
                <h3>{story.title}</h3>
                <p className="short-description">{story.short_description}</p>

                <Link to="/istorijos" className="btn secondary">
                  Skaityti daugiau
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} Padėkime Kartu. Visos teisės saugomos.</p>
      </footer>
    </div>
  );
}