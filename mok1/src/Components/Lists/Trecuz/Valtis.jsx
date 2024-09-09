export default function Valtis({ type, color }) {
    if(type === 'man') {
        return (
            <>
                <h3>
                    <span style={{ color: color }}>
                        
                        Valtis:{type}
                        
                    </span>
                </h3>
            </>

        )
    }
    
}