import { CustomersProvider } from '../../Contexts/Customers';
import Layout from './Layout';


export default function Index() {

    return (
        <CustomersProvider>
            <Layout />
           
        </CustomersProvider>
    )
}