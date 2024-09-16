
import randomColor from '../../Functions/randomColor';

export default function BigSq2({ sq2, setSq2 }) {

   

    const change2 = _ => {
        setSq2(randomColor());
    }
    
    return (
        <div className="square big pointer"style={{
            backgroundColor: sq2 + '66',
            border: '1px solid ' + sq2
        }}
        onClick={change2}
        >
            This is BigSq 2
        </div>
    );

}