import Rabit from './Rabit';

export default function Racoon({ svoris, name, color, randomColor, children }) {

    const doThing = _ => {
        return 'Nice animal';
    }



    const yes = <><h3>Yes, true</h3>{doThing()}</>;

    return (

        <>
            <h2 style={{ color }}>
                Racoon
                {name}
                <div>{svoris * 2} kg</div>
            </h2>
            {children}
            <i>
                {
                    0
                        ?
                        yes
                        :
                        <Rabit randomColor={randomColor} />
                }
                {
                    false && <h3>False</h3>
                }
            </i>

        </>

    );


}