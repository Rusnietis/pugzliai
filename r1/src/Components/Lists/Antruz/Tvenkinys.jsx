import Daiktas from './Daiktas'


export default function Tvenkinys({ data }) {

    return (
        <>

            <div><h3>Lyginis</h3>
                {
                    data.filter(item => item.id % 2 === 0).map((item) => <Daiktas key={item.id} vardas={item.name} color={item.color} tipas={item.type} />)
                }
            </div>
            <h3>Nelyginis</h3>
            <div>
                {
                    data.filter(item => item.id % 2 !== 0).map((item) => <Daiktas key={item.id} vardas={item.name} color={item.color} tipas={item.type} />)
                }
            </div>
        </>

    )
};







