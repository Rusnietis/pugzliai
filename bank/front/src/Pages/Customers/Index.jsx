import { CustomersProvider } from '../../Contexts/Customers';
import Delete from './Delete';
import Layout from './Layout';


export default function Index() {

    return (
        <CustomersProvider>
            <Layout />
            <Delete />
        </CustomersProvider>
    )
}