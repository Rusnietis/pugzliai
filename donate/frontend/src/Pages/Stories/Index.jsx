import { DonorsProvider } from '../../Contexts/Donors';
import { StoriesProvider } from '../../Contexts/Stories';
import { WritersProvider } from '../../Contexts/Writers';
import Layout from './Layout';


export default function Index() {

    return (
        <DonorsProvider>
        <StoriesProvider>
            <WritersProvider>
                <Layout />
            </WritersProvider>
        </StoriesProvider>
        </DonorsProvider>
    )
}