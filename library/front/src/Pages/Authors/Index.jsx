import { AuthorsProvider } from "../../Contexts/Authors";

export default function Index() {
    return (
        <AuthorsProvider>
        <h1>Authors</h1>
        </AuthorsProvider>
    )
}