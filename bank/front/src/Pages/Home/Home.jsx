


export default function Home() {
    return (
        <div className="header"
            style={{
                backgroundImage: 'url(/pinigai1.jpeg)',
                backgroundSize: 'cover',
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                position: 'relative'
            }}>
            <div className="header_contents ">
                <h2>Banko aplikacija v.4</h2>
                <p>Ši banko aplikacija sukurta naudojant React, Express ir MariaDB. Ji leidžia vartotojams kurti sąskaitas, pridėti nuotraukas, peržiūrėti balansą ir atlikti kitas operacijas.</p>
            </div>
        </div>
    )
}