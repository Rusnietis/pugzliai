import Sala from './Sala'
import Laivas from './Laivas'
import Valtis from './Valtis'


export default function Jura({ data }) {

    return (
        <>

            {
                data.map((item) => < Valtis key={item.id} type={item.type} color={item.color} />)
            }
            {
                data.map((item) => < Laivas key={item.id} type={item.type} color={item.color}/>)
            }
            {
                data.map((item) => < Sala key={item.id} type={item.type} color={item.color}/>)
            }

        </>
    )

};