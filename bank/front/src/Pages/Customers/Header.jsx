import { useContext } from 'react';
import { Customers } from '../../Contexts/Customers';



export default function Header() {

    const {  stats, setTaxes  } = useContext(Customers);
 console.log(stats)
    // mokesciai nuo visu klientu saskaitu minus 5

    const handleTaxes = () => {
        setTaxes({change: -5})
        
    }

    return (
        <div className="card-header">
              <div>
                   <div className='stats' >
                    <h5 style={{margin: 4}}>Banko statistika</h5>
                    <hr style={{margin: 4}} />
                    
                    { stats === null ? < div className="loader"><div></div></div> : null}
                       {stats && stats.map(item =>
                            <div key={item.name}>
                                <>
                                
                                {
                                    item.name === 'customers' ? < p style={{margin: 0}}>Bankas šiuo metu turi: <b>{item.count}</b> klientus</p> : null 
                                }
                                {
                                   item.name === 'accounts' ? <p style={{margin: 0}}>Bendra laikoma suma: <b>{item.count}</b> eur</p> : null
                                }
                                {
                                    item.name === 'accounts' ? <p>Vidutinė laikoma suma: <b>{item.is_blocked}</b> eur</p> : null
                                }
                                </>
                            </div>
                        )
                    }
                    <hr />
              
                </div>
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