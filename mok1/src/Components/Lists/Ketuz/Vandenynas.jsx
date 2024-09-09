import Tipas from './Tipas';
import Vardas from './Vardas';
import Spalva from './Spalva';

export default function Vandenynas({ data }) {

    return (
        <>
            {data.map((item) => 
                (<div key={item.id}>
                    <h3  >Vandenynas</h3>
                    <Tipas type={item.type} />
                    <Vardas name={item.name} color={item.color} />
                    <Spalva color={item.color}/>
                </div>
            ))}

        </>
    )
}