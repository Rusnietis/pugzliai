export default function Top() {

    const sorts = [
        { id: 'default', title: 'Naujausios viršuje' },
        { id: 'price_asc', title: 'Pigiausios viršuje' },
        { id: 'price_desc', title: 'Brangiausios viršuje' },
        { id: 'price_asc', title: 'A-Z' },
        { id: 'price_desc', title: 'Z-A' }
    ];


    return (

        <div className="top">

            <div className="block">
                <h2>Rūšiuoklė</h2>
                <select>
                    {
                        sorts.map(sort => <option key={sort.id} value= {sort.id}> {sort.title}</option>)
                    }

                </select>
            </div>
        </div>

    )


}