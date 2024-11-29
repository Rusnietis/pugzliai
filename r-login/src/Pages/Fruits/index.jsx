import { useContext } from 'react';
import { Router } from '../../Contexts/Router';
import Page404 from '../Page404';
import List from './List';
import Create from './Create';
import { FruitsProvider } from '../../Contexts/Fruits';
import Edit from './Edit';

export default function Index() {

    const params = useContext(Router);

    console.log(params)

    let returnComponent = <Page404 />
    if (params.length === 0) {
        returnComponent = <List/>
    } else if (params.length === 1 && params[0] === 'create') {
        returnComponent = <Create/>
    } else if (params.length === 2 && params[0] === 'edit') {
        returnComponent = <Edit/>
    }
    return (
        <FruitsProvider>
            {returnComponent}
        </FruitsProvider>
    );
}