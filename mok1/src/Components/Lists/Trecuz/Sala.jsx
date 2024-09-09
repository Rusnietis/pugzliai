export default function Sala({ type, color }) {
    if (type === 'animal') {
        return (
            <>
                <h3>
                    <span style={{ color: color }}>
                        Sala:
                        {type}
                        
                    </span>
                </h3>
            </>

        )

    }
}