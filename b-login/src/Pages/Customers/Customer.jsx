export default function Customer({ customer }) {

    return (
        
        <tr style={{color: customer?.temp ? 'red' : customer.color}}>
            <td>{customer.id}</td>
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
                <div className="buttonas">
                    <b><a href={'#customers/edit/' + customer.id}>Pridėti pinigus</a></b>
                    {/* <button className="blue">Nuimti pinigus</button> */}
                </div>
            </td>
        </tr>
    )
}