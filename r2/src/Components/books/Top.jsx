import { useContext, useEffect, useState } from "react";
import { BooksData } from "./BooksData";


export default function Top() {

    const sorts = [
        { id: 'default', title: 'Naujausios viršuje' },
        { id: 'price_asc', title: 'Pigiausios viršuje' },
        { id: 'price_desc', title: 'Brangiausios viršuje' },
        { id: 'price_asc', title: 'A-Z' },
        { id: 'price_desc', title: 'Z-A' }
    ];

    const [min, setMin] = useState(0);
    const [max, setMax] = useState(0);

    const { setSort, sort, types, filterCat, setFilterCat, books, filterMin, setFilterMin, filterMax, setFilterMax } = useContext(BooksData);

    useEffect(_ => {
        if (null === books) {
            return;
        }
        const minMax = books.reduce((acc, book) => {
            if (book.price < acc.min) {
                acc.min = book.price;
            }
            if (book.price > acc.max) {
                acc.max = book.price;
            }
            return acc;
        }, { min: books[0].price, max: books[0].price });
        setMax(Math.ceil(minMax.max) );
        setMin(Math.floor(minMax.min));
    }, [books, setMin, setMax])

    useEffect(_=>{
        setFilterMin(min);
        setFilterMax(max);
    },[setFilterMin, setFilterMax, min, max])

    return (

        <div className="top">

            <div className="block">
                <h2>Rūšiuoklė</h2>
                <select value={sort} onChange={e => setSort(e.target.value)}>
                    {
                        sorts.map(sort => <option key={sort.id} value={sort.id}> {sort.title}</option>)
                    }

                </select>
            </div>
            {
                types &&
                <div className="block">
                    <h2>Kategorijos</h2>
                    <select value={filterCat} onChange={e => setFilterCat(e.target.value)}>
                        <option value="all">Visos</option>
                        {
                            types.map(sort => <option key={sort.id} value={sort.id}> {sort.title}</option>)
                        }

                    </select>
                </div>
            }

            {
                books &&
                <div className="block">
                    <h2>Kainu filtras</h2>
                    <div className="prices">
                        <label>Nuo:</label>
                        <div>
                            <span>{min}</span>
                            <span>{filterMin}</span>
                            <span>{max}</span>
                        </div>
                        <input type="range" min={min} max={max} value={filterMin} onChange={e=>setFilterMin(+e.target.value)} />
                    </div>
                    <div className="prices">
                        <label>Iki:</label>
                        <div>
                            <span>{min}</span>
                            <span>{filterMax}</span>
                            <span>{max}</span>
                        </div>
                        <input type="range" min={min} max={max} value={filterMax} onChange={e=>setFilterMax(+e.target.value)}/>
                    </div>

                </div>
            }
        </div >

    )


}