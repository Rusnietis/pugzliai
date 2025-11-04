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

                <div className="left-col">
                    <h1>Vartotojų sąrašas</h1>

                    {/* user komponento atvaizdavimas lenteleje */}

                    {/* <table>
                    <thead>
                        <tr>
                            <th>Vardas</th>
                            <th>Rolė</th>
                            <th>Rolės keitimas</th>
                            <th>Veiksmai</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length === 0 ? (
                            <p>Nėra vartotojų.</p>
                        ) : (
                            users.map(user => <User key={user.id} user={user} />)
                        )}

                    </tbody>
                </table> */}

                    {
                        users.map(user => <User key={user.id} user={user} />)
                    }
                </div>
            </div>
        </div>
    );
}





