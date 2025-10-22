import { useContext } from 'react';
import { Users } from '../../Contexts/Users';
import User from './User';
import '../../Style/users.scss';

export default function List() {
    const { users } = useContext(Users);

    if (!users)
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
        if (users.error)
            return (
                <div>

                    <h1>Serverio klaida</h1>
                </div>
            )


    return (

        <div className="page-users">
         
           
            <div className="users-box">
                 <h1>Vartotojų sąrašas</h1>
                {
                    users.map(user => <User key={user.id} user={user} />)
                }

            </div>
        </div>
    );
}





