import { useContext, useState } from "react";
import { Stories } from "../../Contexts/Stories";
import { Donors } from '../../Contexts/Donors';
import { SERVER_URL } from "../../Constants/main";
import '../../Style/StoriesList.scss';
import '../../Style/button18.scss';

const defaultInputs = {
  name: '',
  amount: '',
  date: Date.now(),

}

export default function List() {

  const [inputs, setInputs] = useState(defaultInputs);

  const { stories } = useContext(Stories);
  // const { setStoreDonor } = useContext(Donors);

  console.log('Donors', Donors)

  const handleChange = e => {
    setInputs(prev => ({ ...prev, [e.target.id]: e.target.value }));
  }


  const addMoney = (donor) => {
    console.log('Aukoju', donor)
  }

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
            <div className="donate-section">
              {/* Aukojimo sritis */}
              <div className="form-col">
                <div className="" style={{ fontSize: '18px' }}>Aukokite dabar</div>
                <hr />
                <div className="list-field">
                  <label htmlFor="name" >Vardas</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Įveskite vardą"
                    value={inputs.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="list-field">
                  <label htmlFor="amount">Suma (EUR)</label>
                  <input
                    type="number"
                    id="amount"
                    placeholder="Iveskite sumą"
                    value={inputs.amount}
                    onChange={handleChange}

                  />
                </div>
                <div className="list-actions" >
                  <button type="button"
                    className="button-18"
                    onClick={addMoney}
                  >
                    Aukoti
                  </button>
                </div>
              </div>
              <div className="money">
                <div className="" style={{ fontSize: '18px' }}>Kaip mums sekasi</div>
                <hr />
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
              <div className="donors-list">
                <div className="" style={{ fontSize: '18px' }}>Aukotojų sarašas</div>
                <hr />
              </div>
            </div>
          </div>
        ))}
    </aside>

  );
}


