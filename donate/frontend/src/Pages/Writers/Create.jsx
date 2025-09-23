import { useContext, useState } from 'react';
import "./StoryCard.scss";
import { Writers } from '../../Contexts/Writers';

const defaultInputs = {
  name: '',
  surname: '',
  createdAt: '',
  title: '',
  story: '',
  goal: '',

}

export default function CreateStory() {

  const [inputs, setInputs] = useState(defaultInputs);

  const {setStoreWriter} = useContext(Writers)

  const handleChange = e => {
    setInputs(prev => ({ ...prev, [e.target.id]: e.target.value }));
  }

  const create = _ => {
    setStoreWriter(inputs);
    setInputs(defaultInputs);
  }



  return (
    <div className="form-col">
      <div>
        <h2 id="card-title">Pridėti istoriją / idėją</h2>
        <p className="lead">
          Įveskite trumpą istorijos aprašymą, pridėkite nuotrauką ir nurodykite norimą surinkti sumą.
        </p>
      </div>

      <form className="story-form" autoComplete="off">
        <div className="field">
          <label htmlFor="name" >Vardas</label>
          <input type="text" id="name" value={inputs.name} onChange={handleChange} placeholder="Įveskite vardą" />
        </div>

        <div className="field">
          <label htmlFor="surname">Pavardė</label>
          <input type="text" id="surname" value={inputs.surname} onChange={handleChange} placeholder="Įveskite pavardę"  />
        </div>

        <div className="field">
          <label htmlFor="createdAt">Sukūrimo data</label>
          <input type="date" id="createdAt" value={inputs.createdAt} onChange={handleChange} />
        </div>

        <div className="field">
          <label htmlFor="title">Istorijos pavadinimas</label>
          <input type="text" id="title" value={inputs.title} onChange={handleChange} placeholder="Įveskite pavadinimą" />
        </div>

        <div className="field">
          <label htmlFor="story">Istorijos / idėjos tekstas</label>
          <textarea id="story" value={inputs.story} onChange={handleChange} placeholder="Parašykite čia..."></textarea>
        </div>

        <div className="field">
          <label htmlFor="img">Nuotrauka</label>
          <input type="file" accept="image/*" />
        </div>

        <div className="field">
          <label htmlFor="goal">Norima surinkti suma (EUR)</label>
          <input
            className="amount"
            type="number"
            id="goal"
            value={inputs.goal}
            onChange={handleChange}
            placeholder="pvz. 1500"
          
          />
        </div>

        <div className="actions">
          <button type="button"
            className="btn primary"
            onClick={create}
          >
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

