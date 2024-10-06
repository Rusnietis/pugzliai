import Show from "./Show";

export default function Read({ customers, setDeleteData }) {

    console.log(customers)

    return (
        <>
            <h2><b>Banko klientai</b></h2>
            {/* <ul className="list-group">
                {customers.map(customer => (
                    <li key={customer.id} className="list-group-item"><Show customer={customer}/></li>
                ))}
            </ul> */}
            <Show customers={customers} setDeleteData={setDeleteData}/>
        </>
    )

}