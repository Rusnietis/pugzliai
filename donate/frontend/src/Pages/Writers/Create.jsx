import { useContext, useState, useRef } from 'react';
import { Writers } from '../../Contexts/Writers';
import useImage from '../../Hooks/useImage';
import "./StoryCard.scss";

const defaultInputs = {
  name: '',
  surname: '',
  createdAt: '',
  title: '',
  shortDescription: '',
  story: '',
  goal: ''

}

export default function CreateStory() {

  const [inputs, setInputs] = useState(defaultInputs);

  const { setStoreWriter } = useContext(Writers)

  const { image, readImage, setImage } = useImage();
  const imageInput = useRef()

  const handleChange = e => {
    setInputs(prev => ({ ...prev, [e.target.id]: e.target.value }));
  }

  const create = _ => {
    console.log("KURIU SU INPUTS:", inputs);
    setStoreWriter({ ...inputs, image });
    setInputs(defaultInputs);
    imageInput.current.value = null;
    setImage(null);
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
          <input type="text" id="surname" value={inputs.surname} onChange={handleChange} placeholder="Įveskite pavardę" />
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
          <label htmlFor="shortDescription">Trumpas aprašymas</label>
          <input
            type="text"
            id="shortDescription"              
            value={inputs.shortDescription}
            onChange={handleChange}
            placeholder="Įveskite trumpą istorijos aprašymą"
          />
        </div>
        <div className="field">
          <label htmlFor="story">Istorijos / idėjos tekstas</label>
          <textarea id="story" value={inputs.story} onChange={handleChange} placeholder="Parašykite čia..."></textarea>
        </div>

        <div className="field">
          <label htmlFor="image">Nuotrauka</label>
          <input type="file"
            ref={imageInput}
            id="image"
            onChange={readImage}
          />
        </div>
        {/* {console.log(image)} */}
        {
          image &&
          <div className="mb-3" >
            <img src={image} alt={inputs.name} className="img-fluid" style={{ width: '350px' }} />
          </div>
        }

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

