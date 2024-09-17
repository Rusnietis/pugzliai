export default function Akvariumas({type, name, color}) {

    if (type === 'fish') {

        return (

            <>
                 <h3 style={{color:color}}>
                 
                 Akvariumas:
                 {type}
                 {name}
             
             </h3>
            </>
    
        )
    }

}