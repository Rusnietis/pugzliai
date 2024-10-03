import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';

export default function Create({ setCreateData }) {
    const [customer, setCustomer] = useState([{
        id: uuidv4(),
        vardas: '',
        saskaita: '',
        amount: 0
    }]);
    console.log(customer)

    const handleSubmit = e => {

        const { name, value } = e.target;
        // setCustomer(prev => prev.map(customer, i => i === index ? e.target.value : customer));
        setCustomer({ ...customer, [name]: value })
        setCreateData({ ...customer, customer })

    }

    return (
        <>
            <h3>Naujo kliento pridėjimas</h3>
            <div className="mb-3">
                <label className="form-label">Vardas, pavardė</label>
                <input type="tex" name="vardas" className="form-control" placeholder="Vardas, pavardė"
                    value={customer.vardas} onChange={handleSubmit}
                />
                <label className="form-label">Sąskaitos numeris</label>
                <input type="tex" name="saskaita" className="form-control" placeholder="Sąskaitos Nr"
                    value={customer.saskaita} onChange={handleSubmit}
                />


                <label className="form-label">Example textarea</label>
                <div className="buttons">
                    <button className="blue" onClick={handleSubmit}>Pridėti klienta</button>
                </div>
            </div>
        </>
    )


}