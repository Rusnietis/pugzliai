import Nav from './Nav';
import { useContext } from 'react';
import { ParameterContext } from './Layout';
import Link from './Link';
import '../../buttons.scss';


export default function About() {

    const { params } = useContext(ParameterContext);

    return (
        <>
            <Nav />
            <main>
                <h1>About</h1>
                <h2>Parameter 1:</h2>
                <p style={{ textAlign: 'center' }}>Parameter 1 is {params[0]}</p>
                <h2>Parameter 2:</h2>
                <p style={{ textAlign: 'center' }}>Parameter 2 is {params[1]}</p>
                <div className="buttons">
                    <Link href="#about/bebras">About Bebras</Link>
                    <Link href="#about/lape">About Lapė</Link>
                    <Link href="#about/zuikis">About Zuikis</Link>
                </div>
            </main>
        </>
    )
}