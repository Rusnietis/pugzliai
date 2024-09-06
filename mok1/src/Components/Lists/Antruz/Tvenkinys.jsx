import Daiktas from './Daiktas'


export default function Tvenkinys({ color, vardas, tipas }) {

    return (
        <>
            <h3 style={{ color: color }}>
               
                <Daiktas tipas={tipas} vardas={vardas} />
                <Daiktas />
            </h3 >
        </>

    )
};







