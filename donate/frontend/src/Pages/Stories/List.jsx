import { useContext, useState } from "react";
import axios from 'axios';
import { Stories } from "../../Contexts/Stories";
import { Donors } from '../../Contexts/Donors';
import { SERVER_URL } from "../../Constants/main";
import * as s from '../../Actions/stories';
import '../../Style/StoriesList.scss';
import '../../Style/button18.scss';

const defaultInputs = {
  name: '',
  amount: '',
  date: ''

}

export default function List() {

  const [inputs, setInputs] = useState(defaultInputs);

  const { stories, dispatchStories } = useContext(Stories);
  const { donors, setStoreDonor } = useContext(Donors);

  console.log('Donors', donors)
  console.log('Stories', stories)


  const handleChange = e => {
    setInputs(prev => ({ ...prev, [e.target.id]: e.target.value }));
  }

  const addMoney = (story) => {
    const donationData = {
      name: inputs.name,
      amount: parseFloat(inputs.amount),
      story_id: story.id,
      date: new Date().toISOString(),
    };

    console.log('💸 Siunčiu donaciją per context:', donationData);

    // Vietoj axios — naudojam kontekstą
    setStoreDonor(donationData);

    // Vietoje atskiro axios — surinkta suma atsinaujins per reducerį
    dispatchStories(s.updateCollected(story.id, donationData.amount));

    setInputs(defaultInputs);
  };

  const approvedStories = stories.filter(story => story.status === 'approved');

  // jei istorija yra nepatvirtinta
  console.log("Statuses:", approvedStories);

  return (
    <aside className="preview-col">

      {/* Filtruojame tik patvirtintas istorijas */}
      {approvedStories.length === 0 ? (
        <div className="no-stories">
          <h2>🔔 Šiuo metu nėra patvirtintų istorijų</h2>
          <p>Patikrinkite vėliau – netrukus čia atsiras naujų pagalbos prašymų.</p>
        </div>
      ) : (
        approvedStories
          .map((story) => (
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

              {story.collected < story.goal ? (
                <div className="donate-section">
                  {/* Aukojimo forma */}
                  <div className="form-col">
                    <div className="one" style={{ fontSize: '18px' }}>Aukokite dabar</div>
                    <hr />
                    <div className="list-field">
                      <label htmlFor="name">Vardas</label>
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
                        placeholder="Įveskite sumą"
                        value={inputs.amount}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="list-actions">
                      <button
                        type="button"
                        className="button-18"
                        onClick={() => addMoney(story)}
                      >
                        Aukoti
                      </button>
                    </div>
                  </div>

                  {/* Tikslai ir aukotojai */}
                  <div className="money">
                    <div className="one" style={{ fontSize: '18px' }}>Kaip mums sekasi</div>
                    <hr />
                    <div className="goal">
                      <div className="list-field">🎯 Tikslas</div>
                      <div className="amount-pill">€{story?.goal || "0"}</div>
                    </div>

                    <div className="collected">
                      <div className="list-field">🎯 Jau surinkta</div>
                      <div className="amount-pill">{story?.collected} €</div>
                    </div>

                    <div className="remaining">
                      <div className="list-field">🎯 Dar liko surinkti</div>
                      <div className="amount-pill">
                        {(story?.goal || 0) - (story?.collected || 0)} €
                      </div>
                    </div>
                  </div>

                  <div className="donors-list">
                    <div className="one" style={{ fontSize: '18px' }}>Aukotojų sąrašas</div>
                    <hr />
                    {donors
                      ?.filter(d => d.story_id === story.id)
                      .map(donor => (
                        <div key={donor.id} className="donor-list">
                          <li>{donor.name} – {donor.amount} €</li>
                        </div>
                      ))}
                  </div>
                </div>
              ) : (
                <div className="thanks-message">
                  🎉 Tikslas pasiektas! Dėkojame visiems aukotojams ❤️
                </div>
              )}
            </div>
          ))
      )}
    </aside>
  );

}


