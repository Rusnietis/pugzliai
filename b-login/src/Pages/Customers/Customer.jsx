import Gate from "../Auth/Gate";





export default function Customer({ customer, index }) {
    console.log(customer)
    return (
        <>
    
        <tr style={{ color: customer?.temp ? 'red' : customer.color }}>
            
            <td>{index + 1}</td>
            <td>{customer.name}</td>
            <td>{customer.account}</td>
            <td>{customer.amount}</td>
            <td>
            <div className="buttonas">
                   <Gate roles="admin" ><b><a href={'#customers/delete/' + customer.id}>Ištrinti</a></b></Gate> 
                </div>
            </td>

            <td>
                <div className="buttonas">
                <Gate roles="admin|editor" > <b><a href={'#customers/edit/' + customer.id}>Pridėti pinigus</a></b></Gate>
                </div>
            </td>
        </tr>
        </>
        
    )
   
    
    
}