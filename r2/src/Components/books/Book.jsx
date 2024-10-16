export default function Book({book}) {

    return (
        <div className="book">
            <h3>{book.title}</h3>
            <p>{book.author}</p>

        </div>
    )
}