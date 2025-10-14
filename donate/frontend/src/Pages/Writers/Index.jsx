
import { StoriesProvider } from '../../Contexts/Stories';
import { WritersProvider } from '../../Contexts/Writers';
import Layout from './Layout';


export default function Index() {

    return (
        
            <StoriesProvider>
                <WritersProvider>
                    <Layout />
                </WritersProvider>
            </StoriesProvider>
       
    )
}