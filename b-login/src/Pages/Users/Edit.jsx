import { Users } from '../../Contexts/Users';
import { Router } from '../../Contexts/Router';
import TopNav from '../TopNav';
import { useContext, useEffect, useState } from 'react';

export default function Edit() {

    const [role, setRole] = useState('');
    const [user, setUser] = useState(null);
    const { users, setEditUser, setUsers } = useContext(Users);
    const { params } = useContext(Router);

    useEffect(_ => {
        if (null === users) {
            return;
        }
        
        const user = users.find(user => user.id === params[1]);
        if (!user) {
            setUser(null);
        } else {
            setUser(user);
        }
    }, [users, params[1]]);

    useEffect(_ => {
        if (null === user) {
            return;
        }
        setRole(user.role.toLowerCase());
    }, [user, setRole]);

    const save = _ => {
        const editedUser = {
            role,
            name: user.name,
            id: user.id
        };
        
        setUsers(f => f.map(user => user.id === editedUser.id ? { ...editedUser, temp: true, preEdit: user } : user)); 
       
        setEditUser(editedUser);  // this is the function that sends the edited user to the server
        window.location.href = '#users';
    }

    if (!users)
        return (
            <div>
                <TopNav />
                <h1>Loading...</h1>
            </div>
        );

    if (!user)
        return (
            <div>
                <TopNav />
                <h1>User not found</h1>
            </div>
        );

    return (
        <div>
            <TopNav />
            <h1>Edit user: <b style={{color: 'orange'}}> {user.username} </b>role </h1>
            <div className="users-bin">
                <div className="form">
                    <div className="form-group">
                        <label>Role</label>
                        <div className="checkboxes">
                            <div>
                                <input id="s" type="checkbox" checked={'admin' === role} onChange={_ => setRole('admin')} />
                                <label htmlFor="s">Admin</label>
                            </div>
                            <div>
                                <input id="c" type="checkbox" checked={'editor' === role} onChange={_ => setRole('editor')} />
                                <label htmlFor="c">Editor</label>
                            </div>
                            <div>
                                <input id="r" type="checkbox" checked={'viewer' === role} onChange={_ => setRole('viewer')} />
                                <label htmlFor="r">Viewer</label>
                            </div>
                        </div>
                    </div>
                    <button className="green" onClick={save}>Change Role</button>
                </div>
            </div>
        </div>
    );
}