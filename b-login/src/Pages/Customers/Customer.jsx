export default function Customer({ customer }) {

    return (
        
        <tr>
            <th scope="row">{customer.id}</th>
            <td>{customer.name}</td>
            <td>{customer.account}</td>
            <td>{customer.amount}</td>
            <td>
                <button className="red">Ištrinti</button>
            </td>
            <td>
                <div className="form">
                    <input type="number" />
                </div>
            </td>
            <td>
                <div className="buttons">
                    <button className="green">Pridėti pinigus</button>
                    {/* <button className="blue">Nuimti pinigus</button> */}
                </div>
            </td>
        </tr>
    )
}