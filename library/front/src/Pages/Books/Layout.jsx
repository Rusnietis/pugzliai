import Nav from '../../Components/Nav';
import List from './List';
import Delete from './Delete';
import Edit from './Edit';
import { useContext } from 'react';
import { Books } from '../../Contexts/Books';
import Create from './Create';


export default function Layout() {

    const { editBook, deleteBook } = useContext(Books)

    return (
        <>
            <Nav />
            <div className="container ">
                <div className="row">
                    <div className="col-4 mt-4">
                        <h1>Books</h1>
                    </div>
                </div>
            </div>
            <div className="container ">
                <div className="row">
                    <div className="col-4 mt-4" >
                        <Create />
                    </div>
                    <div className="col-8 mt-4">
                        <List />
                    </div>
                </div>
            </div>
            {deleteBook && <Delete />}
            {editBook && <Edit />}
        </>
    )
}