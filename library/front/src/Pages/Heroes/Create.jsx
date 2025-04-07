import { useState, useContext, useRef } from 'react';
import { Heroes } from '../../Contexts/Heroes';
import useBooksDropdown from '../../Hooks/useBooksDropdown';
import useImage from '../../Hooks/useImage';
import * as v from '../../Validators/textInputs';
import { MessagesContext } from '../../Contexts/Messages';




const defaultInputs = {
    name: '',
    good: 1,
    book_id: ''
}

export default function Create() {

    const [inputs, setInputs] = useState(defaultInputs);
    const { booksDropdown } = useBooksDropdown();
    const { setStoreHero } = useContext(Heroes);
    const { image, readImage, setImage } = useImage();
    const imageInput = useRef();
    const { addMessage } = useContext(MessagesContext);
    const [e, setE] = useState(new Map());


    const handlerChange = e => {
        setInputs(prev => ({ ...prev, [e.target.id]: e.target.value })); // 
    }

    const create = _ => {

        //console.log(image, imageInput.current.files[0]);

        const booksIds = booksDropdown.map(book => book.id);

        const errors = new Map();
        v.validate(inputs.name, 'name', errors, [v.required, v.string, [v.min, 3], [v.max, 100]]);
        v.validate(inputs.good, 'good', errors, [v.required, [v.integer, [0, 1]]]);
        v.validate(inputs.book_id, 'book_id', errors, [v.required, [v.inNumbers, booksIds]]);
        v.validate(imageInput.current.files[0], 'image', errors, [v.sometimes, [v.imageType, ['jpeg', 'png']], [v.imageSize, 1000000]]);

        if (errors.size > 0) {
            errors.forEach(err => addMessage({ type: 'danger', text: err }));
            setE(errors);
            return;
        }



        const author = {
            surname: booksDropdown.find(book => book.id === +inputs.book_id).surname,
            name: booksDropdown.find(book => book.id === +inputs.book_id).name
        }
        const book = {
            title: booksDropdown.find(book => book.id === +inputs.book_id).title
        }
        setStoreHero({ ...inputs, author, book, image });
        setInputs(defaultInputs);
        imageInput.current.value = null;
        setImage(null)
    }

    return (
        <div className="card mt-2 ">
            <div className="card-header">
                <h3>Create Hero</h3>
            </div>
            <div className="card-body">

                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" style={{borderColor: e.has('name') ? 'crimson' : null }} id="name" value={inputs.name} onChange={handlerChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="good" className="form-label">Good/Bad</label>
                    <h5 style={{ cursor: 'pointer', display: inputs.good ? 'block' : 'none' }} onClick={_ => handlerChange({ target: { value: 0, id: 'good' } })} >Good</h5>
                    <h5 style={{ cursor: 'pointer', display: inputs.good ? 'none' : 'block' }} onClick={_ => handlerChange({ target: { value: 1, id: 'good' } })}>Bad</h5>
                </div>

                {booksDropdown &&
                    <div className="mb-3">
                        <label htmlFor="book_id" className="form-label">Books</label>
                        <select className="form-select" style={{borderColor: e.has('book_id') ? 'crimson' : null }} id="book_id" value={inputs.book_id} onChange={handlerChange}>
                            <option value="">Select book</option>
                            {booksDropdown.map(book => <option key={book.id} value={book.id}>{book.title}</option>)}
                        </select>
                    </div>
                }
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Image</label>
                    <input ref={imageInput} type="file" className="form-control" style={{borderColor: e.has('image') ? 'crimson' : null }} id="image" onChange={readImage} />
                </div>
                {
                    image &&
                    <div className="mb-3">
                        <img src={image} alt={inputs.name} className="img-fluids" />
                    </div>
                }
            </div>
            <div className="card-footer">
                <button type="button" className="btn btn-primary m-2" onClick={create} >Create</button>
            </div>
        </div>
    )
}