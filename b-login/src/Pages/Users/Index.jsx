import { useContext } from 'react';
import { Router } from '../../Contexts/Router';
import Page404 from '../Page404';
import { UsersProvider } from '../../Contexts/Users';
import PageGate from '../Auth/PageGate';
import Create from './Create';


export default function Index() {

    const { params } = useContext(Router);

    console.log(params)

    let returnComponent = <Page404 />;

    if (to === 'register') {
        returnComponent = <Create />
    }



    return (
        <UsersProvider>
            {returnComponent}
        </UsersProvider>

    )

}