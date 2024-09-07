export default function Laivas({ tipas, vardas, color }){
    if (tipas === 'car') {
        return (
            <>
                <h3>
                    <div style={{ color: color }}>
                        Laivas
                        {tipas}
                        {vardas}
                    </div>
                </h3>
            </>

        )
    }




}