export default function Dogs({ vardas, skaicius }) {

    const randomColor = _ => '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    const color = randomColor();


    return (
        <>
            {/* <div className="square" style={{
                backgroundColor: color + '22',
                borderColor: color,
            }}>
                <span className="square__animal">{vardas}</span>
            </div> */}
            {/* <div className="circle" style={{
                backgroundColor: color + '22',
                borderColor: color,
            }}>
                <span className="circle__animal">{skaicius} {vardas}</span>
            </div > */}
            <div className="circle" style={{
                backgroundColor: color + '33',
                borderColor: color,
            }}>
                <span className="circle__animal">{skaicius} {vardas} </span>
            </div >
            



        </>


    );

};