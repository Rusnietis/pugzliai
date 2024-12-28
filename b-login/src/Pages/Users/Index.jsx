import { useContext } from 'react';
import { Router } from '../../Contexts/Router';
import Page404 from '../Page404';
import { UsersProvider } from '../../Contexts/Users';
import PageGate from '../Auth/PageGate';
import Create from './Create';
import List from './List';


export default function Index({to}) {

    const { params } = useContext(Router);

    console.log(params)

    let returnComponent = <Page404 />;

    if (to === 'register') {
        returnComponent = <Create />
    } else if (params.length === 0) {
        returnComponent = < List />;
    }




    return (
        <UsersProvider>
            {returnComponent}
        </UsersProvider>

    )

}