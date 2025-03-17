import { useContext } from 'react';
import { Router } from '../../Contexts/Router';
import Page404 from '../Page404';
import List from './List';
import Create from './Create';
import { CustomersProvider } from '../../Contexts/Customers';
import Edit from './Edit';
import Delete from './Delete';
import PageGate from '../Auth/PageGate';

// pagalbinė funkcija, kuri pagal route ir params grąžina atitinkamą komponentą
export default function Index() {

    const {params} = useContext(Router); 

    //console.log(params)

    let returnComponent = <Page404 />;

    if (params.length === 0) {
        returnComponent = <List />;
    } else if (params.length === 1 && params[0] === 'create') {
        returnComponent = <PageGate roles="admin|editor"><Create /></PageGate>;;
    } else if (params.length === 2 && params[0] === 'edit') {
        returnComponent = <PageGate roles="admin|viewer"><Edit customerId={params[1]} /></PageGate>;
    } else if (params.length === 2 && params[0] === 'delete') {
        returnComponent = <PageGate roles="admin"><Delete /></PageGate>;
    }

    return (
        
        <CustomersProvider> 
            {returnComponent} 
        </CustomersProvider>
        
    )
   
}