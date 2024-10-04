import Show from "./Show";

export default function Read({ customers }) {

    console.log(customers)

    return (
        <>
            <h2><b>Banko klientai</b></h2>
            <table className="table table-bordered">

                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Vardas, pavardė</th>
                        <th scope="col">Sąskaitos Nr.</th>
                        <th scope="col">Suma Eur.</th>
                        <th scope="col">Pridėti</th>
                    </tr>
                </thead>
                <tbody>
            {(customers || []).map(customer => (
                        <tr key={customer.id}>
                            <td>{customer.index}</td>
                            <td>{customer.vardas}</td>
                            <td>{customer.saskaita}</td>
                            <td>{customer.amount}</td>
                            <td>
                                {/* <div className="form">
                                    <input type="number" value={inputValue} onChange={(e) => setInputValue(Number(e.target.value))} />
                                </div> */}
                                {/* <div className="buttons">
                                    <button className="red" onClick={_ => deleteItem(item.id)} >Ištrinti</button>
                                    <button className="yellow" onClick={_ => handleAmountChange(item.id)} >Pridėti lėšų</button>
                                    <button className="blue" onClick={_ => handleAmountMinus(item.id)} >Ištrinti lėšas</button>
                                </div> */}
                            </td>
                            {/* <Show customer={customer} /> */}
                        </tr>
                    ))}

                </tbody >

            </table >
        </>
    )

}