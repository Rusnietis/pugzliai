import { WritersProvider } from '../../Contexts/Writers';
import Layout from './Layout';


export default function Index() {

    return (
        <WritersProvider>
            <Layout />
           
        </WritersProvider>
    )
}