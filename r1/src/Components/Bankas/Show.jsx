export default function Show({ customers, setDeleteData, setEditData }) {
    return (
        <>
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

                                <div className="form">

                                    <div className="buttons">
                                        <button className="red" onClick={_ => setDeleteData(customer)} >Ištrinti klienta</button>
                                        <button className="yellow" onClick={_ => setEditData(customer)}>Keisti</button>

                                    </div>
                                </div>
                            </td>

                        </tr>
                    ))}

                </tbody >

            </table >

        </>

    )
}