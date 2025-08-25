import { useContext } from 'react';
import { Customers } from '../../Contexts/Customers';



export default function Header() {

    const { setTaxes } = useContext(Customers);

    // mokesciai nuo visu klientu saskaitu minus 5

    const handleTaxes = () => {
        setTaxes({change: -5})
        
    }

    return (
        <div className="card-header">
            <div className="Info">
                <h3>Info</h3>
            </div>
            <div className="taxes">
                <button
                    className="button-18 blue"
                    onClick={handleTaxes}
                >
                    Mokesčiai
                </button>
            </div>
        </div>

    )
}