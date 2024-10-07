import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function Edit({ editData, setEditData, setUpdateData }) {

    const [customer, setCustomer] = useState({
        id: uuidv4(),
        vardas: '',
        saskaita: '',
        amount: 0,
    });
    const [adjustAmount, setAdjustAmount] = useState(0);


    useEffect(_ => {
        if (null === editData) {
            return;
        }
        setCustomer(editData);
    }, [editData])

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setCustomer(prevCustomer => ({
    //         ...prevCustomer,
    //         [name]: value,  // Dinamiškai atnaujiname `vardas`, `saskaita` arba `amount`
    //     }));
    // };

    // Pridėti nurodytą sumą
    const handleAddAmount = () => {
        setCustomer((prevCustomer) => ({
            ...prevCustomer,
            amount: prevCustomer.amount + adjustAmount, // Pridėti
        }));
    };

    // Atimti nurodytą sumą
    const handleSubtractAmount = () => {
        setCustomer((prevCustomer) => ({
            ...prevCustomer,
            amount: Math.max(prevCustomer.amount - adjustAmount, 0), // Atimti, bet neleidžiame neigiamo rezultato
        }));
    };


    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     setUpdateData({ ...customer, amount: customer.amount || 0 }); // Siunčiame atnaujintus duomenis
    // };

    const save = _ => {

        setUpdateData(customer);

    }

    if (null === editData) {
        return null;
    }

    return (

        <div className="modal" >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Keisti</h5>
                        <button type="button" className="btn-close" onClick={_ => setEditData(null)} ></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3" >
                            <div className="form">
                                <label className="form-label">Suma Eur</label>

                                <input type="number" className="form-control" placeholder="Suma"
                                    value={adjustAmount}
                                    onChange={(e) => setAdjustAmount(Number(e.target.value))} // Konvertuojame į skaičių
                                />
                              
                                <div className="buttons">
                                    <button className="blue" onClick={handleAddAmount} >Pridėti sumas</button>
                                    <button className="red" onClick={handleSubtractAmount} >Atimti sumas</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="green" onClick={save}>Save</button>
                        <button type="button" className="blue" onClick={_ => setEditData(null)} >Cancel</button>

                    </div>
                </div>
            </div>
        </div>

    )
}