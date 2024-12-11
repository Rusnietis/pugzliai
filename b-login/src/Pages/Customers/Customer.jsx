export default function Customer({ customer }) {

    return (
        <div className="row-1">
            <table className="table ">
                <thead>
                    <tr>

                        <th scope="col">#</th>
                        <th scope="col">Vardas, pavardė</th>
                        <th scope="col">Sąskaitos Nr.</th>
                        <th scope="col">Suma Eur</th>
                        <th scope="col"></th>
                        <th scope="col">Įvesti suma</th>
                        <th scope="col">Op. su pinigais</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">{customer.id}</th>
                        <td>{customer.name}</td>
                        <td>{customer.account}</td>
                        <td>{customer.amount}</td>
                        <td><button className="red" >Ištrinti</button></td>
                        <td>
                            <div className="form">
                                <input
                                    type="number"

                                />
                            </div>
                        </td>
                        <td>
                            <div className="buttons">
                                <button className="green" >Pridėti pinigus</button>
                                {/* <button className="blue" >Nuimti pinigus</button> */}
                            </div>

                        </td>
                    </tr>
                </tbody>

            </table>
        </div>

    )
}