import { useContext } from "react";
import { Stories } from "../../Contexts/Stories";
import { SERVER_URL } from "../../Constants/main";
import '../../Style/StoriesList.scss';
import '../../Style/button18.scss';



export default function List() {

  const { stories } = useContext(Stories)

  console.log('Stories list', stories)

  // jei istorija yra nepatvirtinta




  return (

    <aside className="preview-col">
      {
        stories.map((story) => (

          <div key={story.id} className="list-card">
            <div className="preview-title">
              <h2 id="card-title">{story?.title || "Istorijos pavadinimas"}</h2>
            </div>
            <div className="preview-content">
              <div className="preview-photo">
                {story?.image ? (
                  <img src={story.image} alt={story.title} />
                ) : (
                  <img src="/images/no-image.jpg" alt="no image" />
                )}
              </div>
              <div className="list-story">{story?.story}</div>
            </div>
            <div className="money">
              <div className="goal">
                <div className="list-field">🎯 Tikslas</div>
                <div className="amount-pill">€{story?.goal || "0"}</div>
              </div>
              {/* jau surinkta */}
              <div className="collected">
                <div className="list-field">🎯 Jau surinkta</div>
                <div className="amount-pill">€</div>
              </div>
              {/* Darliko surinkti */}
              <div className="remaining">
                <div className="list-field">🎯 Dar liko surinkti</div>
                <div className="amount-pill">€</div>
              </div>
            </div>

            {/* Aukojimo sritis */}

            <div className="donate-section"> 
              <div className="form-col"> 
                <div className="" style={{fontSize: '18px'}}>Aukokite dabar</div>
                <div className="list-field">
                  <label htmlFor="name" >Vardas</label>
                  <input type="text" id="name" placeholder="Įveskite vardą" />
                </div>

                <div className="list-field">
                  <label htmlFor="amount">Suma (EUR)</label>
                  <input
                    type="number"
                    id="amount"
                    placeholder="Iveskite sumą"

                  />
                </div>
                <div className="list-actions" >
                  <button type="button"
                    className="button-18"

                  >
                    Aukoti
                  </button>
                </div>
              </div>

            </div>
          </div>
        ))}
    </aside>

  );
}


