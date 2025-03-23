import { useState, useContext } from 'react';
import { Authors } from '../../Contexts/Authors';

const defaultInputs = {
    name: '',
    surname: '',
    nickname: '',
    born: ''
}

export default function Create() {

    const [inputs, setInputs] = useState(defaultInputs);

    const {setStoreAuthor} = useContext(Authors)

    
    const handlerChange = e => {
        setInputs(prev => ({ ...prev, [e.target.id]: e.target.value })); // 
    }

    const create = _ => {
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
                    <input type="text" className="form-control" id="name" value={inputs.name} onChange={handlerChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="surname" className="form-label">Surname</label>
                    <input type="text" className="form-control" id="surname" value={inputs.surname} onChange={handlerChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="nickname" className="form-label">Nickname</label>
                    <input type="text" className="form-control" id="nickname" value={inputs.nickname} onChange={handlerChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="born" className="form-label">Born</label>
                    <input type="date" className="form-control" id="born" value={inputs.born} onChange={handlerChange} />
                </div>
            </div>
            <div className="card-footer">
                <button type="button" className="btn btn-primary m-2" onClick={create} >Create</button>
            </div>
        </div>
    )
}