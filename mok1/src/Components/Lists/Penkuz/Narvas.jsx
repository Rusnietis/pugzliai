export default function Narvas({type, name, color}) {
    if (type === 'animal') {

        return (

            <>
                 <h3 style={{color:color}}>
                 
                 Narvas:
                 {type}
                 {name}
             
             </h3>
            </>
    
        )
    }
    
}