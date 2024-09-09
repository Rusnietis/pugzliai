export default function Namas({type, name, color}) {

    if (type === 'man') {

        return (

            <>
                <h3 style={{color:color}}>
                 
                    Namas:
                    {type}
                    {name}
                
                </h3>
            </>
    
        )
    }
}