import { useContext, useState } from 'react';
import { Books } from '../../Contexts/Books';
import useAuthorsDropdown from '../../Hooks/useAuthorsDropdown';
import * as v from '../../Validators/textInputs';
import { MessagesContext } from '../../Contexts/Messages';

const defaultInputs = {
    title: '',
    pages: '',
    genre: '',
    author_id: '',
};

export default function Create() {

    const [inputs, setInputs] = useState(defaultInputs);

    console.log(inputs)

    const { authorsDropdown } = useAuthorsDropdown();

    const { setStoreBook } = useContext(Books);

    const { addMessage } = useContext(MessagesContext);
    const [e, setE] = useState(new Map());

    const handleChange = e => {
        setInputs(prev => ({ ...prev, [e.target.id]: e.target.value }));
    }

    // const handleChange = e => {
    //     const { id, value } = e.target;
    
    //     // Jeigu "pages", konvertuojam į number
    //     const newValue = id === 'pages'
    //         ? value === '' ? '' : Number(value)
    //         : value;
    
    //     setInputs(prev => ({ ...prev, [id]: newValue }));
    // };


    // const create = _ => {
    //     const authorsIds = authorsDropdown.map(author => author.id);
    //     const errors = new Map();
    
    //     // Konvertuojam pages į number
    //     const pages = Number(inputs.pages);
    //     const author_id = Number(inputs.author_id); // irgi gali būti string
    
    //     // Validacija
    //     v.validate(inputs.title, 'title', errors, [
    //         v.required, v.string, [v.min, 3], [v.max, 100]
    //     ]);
    
    //     v.validate(pages, 'pages', errors, [
    //         v.required, v.integer, [v.min, 1], [v.max, 10000]
    //     ]);
    
    //     v.validate(inputs.genre, 'genre', errors, [
    //         v.required, v.string, [v.min, 3], [v.max, 100]
    //     ]);
    
    //     v.validate(author_id, 'author_id', errors, [
    //         v.required, [v.inNumbers, authorsIds]
    //     ]);
    
    //     if (errors.size > 0) {
    //         errors.forEach(err => addMessage({ type: 'danger', text: err }));
    //         setE(errors);
    //         return;
    //     }
    
    //     const author = authorsDropdown.find(author => author.id === author_id);
    
    //     setStoreBook({
    //         title: inputs.title,
    //         pages,
    //         genre: inputs.genre,
    //         author_id,
    //         author: {
    //             name: author.name,
    //             surname: author.surname
    //         }
    //     });
    
    //     // Išvalom formą
    //     setInputs(defaultInputs);
    // };

    const create = _ => {

        const authorsIds = authorsDropdown.map(author => author.id);

        const errors = new Map();
        v.validate(inputs.title, 'title', errors, [v.required, v.string, [v.min, 3], [v.max, 100]]);
        v.validate(inputs.pages, 'pages', errors, [v.required, v.integer, [v.min, 1], [v.max, 10000]]);
        v.validate(inputs.genre, 'genre', errors, [v.required, v.string, [v.min, 3], [v.max, 100]]);
        v.validate(inputs.author_id, 'author_id', errors, [v.required, [v.inNumbers, authorsIds]]);

        if (errors.size > 0) {
            errors.forEach(err => addMessage({ type: 'danger', text: err }));
            setE(errors);
            return;
        }

        const author = {
            surname: authorsDropdown.find(author => author.id === +inputs.author_id).surname,
            name: authorsDropdown.find(author => author.id === +inputs.author_id).name
        }
        setStoreBook({...inputs, author});
        setInputs(defaultInputs);
    }

    return (
        <div className="card mt-2">
            <div className="card-header">
                <h3>Create Book</h3>
            </div>
            <div className="card-body">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" style={{borderColor: e.has('title') ? 'crimson' : null}} id="title" value={inputs.title} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="pages" className="form-label">Total pages</label>
                    <input type="text" className="form-control" style={{borderColor: e.has('pages') ? 'crimson' : null}} id="pages" value={inputs.pages} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="genre" className="form-label">Genre</label>
                    <input type="text" className="form-control" style={{borderColor: e.has('genre') ? 'crimson' : null}} id="genre" value={inputs.genre} onChange={handleChange} />
                </div>
                {
                    authorsDropdown &&
                    <div className="mb-3">
                        <label htmlFor="author_id" className="form-label">Author</label>
                        <select className="form-select" style={{borderColor: e.has('author_id') ? 'crimson' : null}} id="author_id" value={inputs.author_id} onChange={handleChange}>
                            <option value="">Select author</option>
                            {
                                authorsDropdown.map(author => <option key={author.id} value={author.id}>{author.name} {author.surname}</option>)
                            }
                        </select>
                    </div>
                }
            </div>
            <div className="card-footer">
                <button type="button" className="btn btn-primary m-2" onClick={create}>Create</button>
            </div>
        </div>
    );
}