import { useContext } from 'react';
import TopNav from '../TopNav';
import { Users } from '../../Contexts/Users';
import User from './User';

export default function List() {
    const { users } = useContext(Users);

    if (!users)
        return (
            <div>
                <TopNav />
                <h1>Loading...</h1>
            </div>
        )
        if (users.error)
            return (
                <div>
                    <TopNav />
                    <h1>Serverio klaida</h1>
                </div>
            )


    return (

        <div>
            <TopNav />
            <h1>Vartotojų sąrašas</h1>
            <div className="users-box">
                {
                    users.map(user => <User key={user.id} user={user} />)
                }

            </div>
        </div>
    );
}





