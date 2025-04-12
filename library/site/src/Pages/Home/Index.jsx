import { useEffect, useState } from 'react';
import Nav from '../../Components/Nav';
import useGet from '../../Hooks/useGet';

const sortBy = [
    { sort: 'name_asc', label: 'Name (A-Z)' },
    { sort: 'name_desc', label: 'Name (Z-A)' }
]

export default function Index() {

    const [sort, setSort] = useState('')

    const { data, loading, setUrl } = useGet('/')
    console.log(data)
    const authorsBooks = data => {
        const authors = [];
        data.forEach(item => {
            if (!authors.some(author => author.id === item.id)) {
                authors.push({ id: item.id, name: item.name, surname: item.surname, books: [] });
            } 
                authors.find(author => author.id === item.id).books.push({ id: item.book_id, title: item.title });
           
        });
        return authors;
    }

    console.log(authorsBooks(data))

    useEffect(_ => {
        if (sort) {
            setUrl(`/?sort=${sort}`)
        } else {
            setUrl('/')
        }
    }, [sort])


    if (loading) return (< div className="loader"><div></div></div>)

    return (
        <>
            <Nav />
            <div className="container text-center">
                <div className="row">
                    <div className="col-4 mt-4">
                        <h1>Home</h1>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-12 mt-4">
                        <div className="card">
                            <div className="card-header">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-3">
                                            <h3>All Library</h3>
                                        </div>
                                        <div className="col-3">
                                            <div className="mb-3">
                                                <label htmlFor="sort" className="form-label">Sort by name</label>
                                                <select className="form-select" id="sort" value={sort} onChange={e => setSort(e.target.value)}>
                                                    <option value="">Default</option>
                                                    {
                                                        sortBy.map(item => {
                                                            return (
                                                                <option key={item.sort} value={item.sort}>{item.label}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="container">
                                    {
                                       authorsBooks(data).map(item =>
                                            <div className="row" key={item.id}>
                                                <div className="col-2 mt-4">
                                                    {item.name} {item.surname}
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
