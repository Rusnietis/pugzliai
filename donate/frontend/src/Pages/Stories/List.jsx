import { useContext } from "react";
import { Stories } from "../../Contexts/Stories";
import { SERVER_URL } from "../../Constants/main";
import '../../Style/StoryCard.scss';

export default function List() {

  const { stories } = useContext(Stories)

  console.log('Stories list', stories)

  // jei istorija yra nepatvirtinta




  return (

    <aside className="preview-col">
      {
        stories.map((story) => (

          <div key={story.id} className="preview-card">
            <div className="preview-title">
              <h2 id="card-title">{story?.title || "Istorijos pavadinimas"}</h2>
            </div>

            <div className="preview-photo">
              {story?.image ? (
                <img src={story.image} alt={story.title} />
              ) : (
                <img src="/images/no-image.jpg" alt="no image" />
              )}
            </div>

            <div className="field">{story?.story}</div>

            <div className="goal">
              <div className="field">🎯 Tikslas</div>
              <div className="amount-pill">€{story?.goal || "0"}</div>
            </div>
            {/* Aukojimo sritis */}

            <div className="donate-section">
              <div className="field">
                <label htmlFor="name" >Vardas</label>
                <input type="text" id="name" placeholder="Įveskite vardą" />
              </div>

              <div className="field">
                <label htmlFor="amount">Norima surinkti suma (EUR)</label>
                <input
                  type="number"
                  id="amount"
                  placeholder="Iveskite sumą"

                />
              </div>
              <div className="actions">
                <button type="button"
                  className="btn primary"

                >
                  Aukoti
                </button>
              </div>
              
            </div>
            </div>
        ))}
    </aside>

  );
}


