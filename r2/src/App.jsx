import { BooksDataProvider } from "./Components/books/BooksData";
import BookList from "./Components/books/BooksList";





export default function App() {

    return (
        <BooksDataProvider>
            <section>
                <div className="container">
                    <div className="books">
                        <BookList />
                    </div>
                </div>
            </section>
        </BooksDataProvider>
    )
}