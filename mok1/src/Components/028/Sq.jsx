import { useEffect } from 'react';

export default function Sq({square, setSquares}) {

    useEffect(_ => {
        // console.log('Square are born ' + square.id);
        // console.log('Button "ADD" was clicked');
        return _ => console.log('Square are dead ' + square.id);
    }, []);


    const remove = _ => {
        // setSquares(s => s.filter(s => s.id !== square.id));
        setSquares(s => s.map(s => s.id === square.id ? { ...s, show: false } : s));
    }

    return (
        <div className="square pulse pointer" style={{
            backgroundColor: square.color + '66',
            border: '1px solid ' + square.color,
        }}
        onClick={remove}
        >{square.id}</div>
    );
}