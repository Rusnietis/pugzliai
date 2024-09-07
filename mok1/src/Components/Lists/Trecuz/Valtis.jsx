export default function Valtis({ tipas, vardas, color }) {
    if (tipas === 'man') {
        return (
            <>
                <h3>
                    <div style={{ color: color }}>
                        Valtis
                        {tipas}
                        {vardas}
                    </div>
                </h3>
            </>

        )
    }
}