import { useContext, useState, useEffect } from 'react';
import TopNav from '../TopNav';
import { Users } from '../../Contexts/Users';
import { Router } from '../../Contexts/Router';




export default function Delete() {

    const [user, setUser] = useState(null);
    const {params} = useContext(Router); // is router konteksto paimame parametrus

    const {users ,setDeleteUser, setUsers } = useContext(Users);


     useEffect(_ => {
            if (null == users) {
                return;
            }
            // Patikriname ar yra klientas
            const user = users.find(user => user.id === params[1])
            console.log(user)
            if (!user) {
                setUser(null)
            } else {
                setUser(user) 
            }
    
        }, [users, params[1]])

    const doDelete = _ => {
        const userId = user.id; 
        setUsers(c => c.map(user => user.id === userId ? { ...user, temp: true } : user));
         setDeleteUser(userId); 
        window.location.href = '#users';
    }

    if (!users)
        return (
            <div>
                <TopNav />
                <h1>Loading...</h1>
            </div>
        )

    if (!user)
        return (
            <div>
                <TopNav />
                <h1>User not Found</h1>
            </div>
        )

    return (
        <div>
            <TopNav />


            <h1>Patvirtinkite kliento ištrinima: <b style={{color: 'red'}}>{user.username}</b></h1>
            <div className='row'>
                <div className="button">
                    <button className="red" onClick={doDelete} >Ištrinti</button>
                    <button className="yellow" onClick={_ => window.location.href = '#users'} >Atšaukti</button>
                </div>
            </div>
        </div>

    )
}