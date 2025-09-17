export default function Create() {
  return (
        <div className="card mt-2">
      <div className="card-header">
        <h3>Sukurti istorija</h3>
      </div>

      <div className="card-body">
        <div className="form-group">
          <label htmlFor="name">Vardas</label>
          <input
            type="text"
            id="name"
            value={inputs.name}
            onChange={handlerChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="surname">Pavardė</label>
          <input
            type="text"
            id="surname"
            value={inputs.surname}
            onChange={handlerChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Nuotrauka</label>
          <input
            ref={imageInput}
            type="file"
            id="image"
            onChange={readImage}
          />
        </div>

        {image && (
          <div className="form-group">
            <img src={image} alt={inputs.name} className="preview" />
          </div>
        )}

        <div className="form-group">
          <p className="attention">
            <b>
              Pastaba. Kliento sąskaitos numeris ir pradinė suma sugeneruojama
              automatiškai!
            </b>
          </p>
        </div>
      </div>

      <div className="card-footer">
        <button className="button-18 blue" onClick={create}>
          Pridėti klientą
        </button>
      </div>
    </div>
  );
}

