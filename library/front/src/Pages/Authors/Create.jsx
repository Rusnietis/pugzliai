import { useState, useContext } from 'react';
import { Authors } from '../../Contexts/Authors';
import * as v from '../../Validators/textInputs';
import { MessagesContext } from '../../Contexts/Messages'

const defaultInputs = {
    name: '',
    surname: '',
    nickname: '',
    born: ''
}

export default function Create() {

    const [inputs, setInputs] = useState(defaultInputs);

    const { setStoreAuthor } = useContext(Authors);
    const {addMessage} = useContext(MessagesContext);
    const [e, setE] = useState(new Map());

    


    const handlerChange = e => {
        setInputs(prev => ({ ...prev, [e.target.id]: e.target.value })); // 
    }

    const create = _ => {
        const errors = new Map();
        v.validate(inputs.name, 'name', errors, [v.required, v.string, v.lettersOnly, [v.min, 3], [v.max, 100]]);
        v.validate(inputs.surname, 'surname', errors, [v.required, v.string, v.lettersOnly, [v.min, 3], [v.max, 100]]);
        v.validate(inputs.nickname, 'nickname', errors, [v.sometimes, v.string, [v.min, 3], [v.max, 100]]);
        v.validate(inputs.born, 'born', errors, [v.required, v.date]);

        if (errors.size > 0) {
            errors.forEach(err => addMessage({type: 'danger', text: err}));
            setE(errors);
            return;
        }

        return;
        setStoreAuthor(inputs);
        setInputs(defaultInputs);
    }

    return (
        <div className="card mt-2 ">
            <div className="card-header">
                <h3>Create Author</h3>
            </div>
            <div className="card-body">

                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" style={{borderColor: e.has('name') ? 'crimson' : null }} id="name" value={inputs.name} onChange={handlerChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="surname" className="form-label">Surname</label>
                    <input type="text" className="form-control" style={{borderColor: e.has('surname') ? 'crimson' : null }} id="surname" value={inputs.surname} onChange={handlerChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="nickname" className="form-label">Nickname</label>
                    <input type="text" className="form-control" style={{borderColor: e.has('nickname') ? 'crimson' : null }} id="nickname" value={inputs.nickname} onChange={handlerChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="born" className="form-label">Born</label>
                    <input type="date" className="form-control" style={{borderColor: e.has('born') ? 'crimson' : null }} id="born" value={inputs.born} onChange={handlerChange} />
                </div>
            </div>
            <div className="card-footer">
                <button type="button" className="btn btn-primary m-2" onClick={create} >Create</button>
            </div>
        </div>
    )
}