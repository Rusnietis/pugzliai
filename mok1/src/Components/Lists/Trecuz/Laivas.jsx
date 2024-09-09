export default function Laivas({ type, color }){
    if (type === 'car') {
        return (
            <>
                <h3>
                    <div style={{ color: color }}>
                        Laivas:
                        {type}
                        
                    </div>
                </h3>
            </>

        )
    }




}