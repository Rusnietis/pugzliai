import Namas from './Namas';
import Narvas from './Narvas';
import Garazas from './Garazas';
import Akvariumas from './Akvariumas';



export default function Pasaulis({ data }) {

    return (
        <>
            <div>
                {
                    data.filter(item => item.id % 2 === 0).map((item, id) => (
                        < div key={item.id}>
                            <h3>Porinis ID</h3>
                            <Namas type={item.type} name={item.name} color={item.color} />
                            <Garazas type={item.type} name={item.name} color={item.color} />
                            <Narvas type={item.type} name={item.name} color={item.color} />
                            <Akvariumas type={item.type} name={item.name} color={item.color} />

                        </div>))
                }
            </div>
            <div>
                {
                    data.filter(item => item.id % 2 !== 0).map((item, id) => (
                        < div key={item.id} >
                            <h3>Neporinis ID</h3>
                            <Namas type={item.type} name={item.name} color={item.color} />
                            <Garazas type={item.type} name={item.name} color={item.color} />
                            <Narvas type={item.type} name={item.name} color={item.color} />
                            <Akvariumas type={item.type} name={item.name} color={item.color} />
                        </div>
                    ))
                }
            </div>
        </>
    )

}