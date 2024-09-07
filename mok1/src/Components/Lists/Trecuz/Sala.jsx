export default function Sala({ vardas, tipas, color }) {
    if (tipas === 'animal') {
        return (
            <>
                <h3>
                    <span style={{ color: color }}>
                        Sala
                        {tipas}
                        {vardas}
                    </span>
                </h3>
            </>

        )

    }
}