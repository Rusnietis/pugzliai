import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';

export default function Create({ setCreateData }) {
    const [customer, setCustomer] = useState({
        id: uuidv4(),
        vardas: '',
        saskaita: '',
        amount: 0,
    });
    console.log(customer)

    const handleChange = e => {
        const { name, value } = e.target;
        setCustomer(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        if (customer.vardas && customer.saskaita) {
            setCreateData(customer); 
            console.log("Klientas pridėtas:", customer);

            setCustomer({
                id: uuidv4(),
                vardas: '',
                saskaita: '',
                amount: 0,
            });
        } else {
            console.log("Prašome užpildyti visus laukus!");
        }
    };

    return (
        <>
            <h3>Naujo kliento pridėjimas</h3>
            <div className="mb-3" >
                <div className="form">
                    <label className="form-label">Vardas, pavardė</label>
                    <input type="text" name="vardas" className="form-control" placeholder="Vardas, pavarde"
                        value={customer.vardas} onChange={handleChange}
                    />
                    <label className="form-label">Sąskaitos numeris</label>
                    <input type="text" name="saskaita" className="form-control" placeholder="Saskaitos Nr."
                        value={customer.saskaita} onChange={handleChange}
                    />
                    <div className="buttons">
                        <button className="blue" onClick={handleSubmit}>Pridėti klienta</button>
                    </div>
                </div>
            </div>
        </>
    )

}