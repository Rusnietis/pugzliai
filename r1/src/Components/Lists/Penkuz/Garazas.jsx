export default function Garazas({type, name, color}) {

    if (type === 'car') {

        return (

            <>
                <h3 style={{color:color}}>
                 
                 Garazas:
                 {type}
                 {name}
             
             </h3>
            </>
    
        )
    }

}