import Sala from './Sala'
import Laivas from './Laivas'
import Valtis from './Valtis'


export default function Jura({ vardas, tipas, color }) {

    return (
        <>
            {/* <div>
                {
                    tipas === 'fish' ? { tipas } : 0
                }
            </div> */}
            <div>
                <Valtis vardas={vardas} tipas={tipas} color={color} />
            </div>
            <div>
                <Laivas vardas={vardas} tipas={tipas} color={color} />
            </div>
            <div>
                <Sala vardas={vardas} tipas={tipas} color={color} />
            </div>
        </>
    )

};