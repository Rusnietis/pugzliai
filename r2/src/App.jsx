import { BooksDataProvider } from "./Components/books/BooksData";
import BookList from "./Components/books/BooksList";
import Top from "./Components/books/Top";
import './books.scss';

// Knygos (paskaitos)

export default function App() {

    return (
        <BooksDataProvider>

            <section>
                <div className="container">
                    <Top />
                </div>
            </section>
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