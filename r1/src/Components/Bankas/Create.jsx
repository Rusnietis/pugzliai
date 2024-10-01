import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';

export default function Create({setCreateData}) {
    const [costumer, setCostumer] = useState({
        id: uuidv4(),
        vardas: '',
        saskaita: '',
        amount: 0

    });
    const [amount, setAmuont] = useState(0);

    const handleSubmit = _ => {
        setCreateData(
            {
                costumer,
                amount: 0
            }
        );
        setCostumer({
            id: uuidv4(),
            vardas: '',
            saskaita: '',
            amount: 0

        });
        setAmuont(0);
    }


    return (
        <>
            <h3>Naujo kliento pridėjimas</h3>
            <div className="mb-3">
                <label className="form-label">Vardas, pavardė</label>
                <input type="tex" name="vardas" className="form-control" placeholder="Vardas, pavardė"
                value={costumer.vardas} onChange={handleSubmit}
                />
                <label className="form-label">Sąskaitos numeris</label>
                <input type="tex" className="form-control" placeholder="Sąskaitos Nr" />

            </div>
            <div className="mb-3">
                <label  className="form-label">Example textarea</label>
                <div className="buttons">
                    <button className="blue" onClick={handleSubmit}>Pridėti klienta</button>
                </div>
            </div>
        </>
    )


}