import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Users } from '../../Contexts/Users';
import { SERVER_URL } from '../../Constants/main';
import '../../Style/users.scss';

export default function Edit() {
    const { id } = useParams(); // 👈 iš URL (/register/edit/:id)
    const navigate = useNavigate();
    const { users, setUsers, setEditUser } = useContext(Users);

    const [role, setRole] = useState('');
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    // Surandam user pagal ID
    useEffect(() => {
        if (!users) return;

        const user = users.find(user => user.id === parseInt(id));
        if (!user) {
            setUser(null)
        } else {
            setUser(user)
        }
    }, [users, id]);

    // Užpildom formos laukus
    useEffect(() => {
        if (!user) return;
        setRole(user.role?.toLowerCase() || '');
    }, [user]);

    // Išsaugom pakeitimus
    const save = _ => {

        const editedUser = {
            role,
            name: user.name,
            id: user.id
        };
        setUsers(f => f.map(user => user.id === editedUser.id ? { ...editedUser, temp: true, preEdit: user } : user));
        setEditUser(editedUser);  // this is the function that sends the edited user to the server
        navigate('/register/list');
    };

    if (!users) return <h1>Kraunama...</h1>;
    if (!user) return <h1>Vartotojas nerastas</h1>;

    return (
        <div>
            <h1>
                Redaguoti vartotoją: <b style={{ color: 'orange' }}>{user.name}</b>
            </h1>
            <div className="users-bin">
                <div className="form">
                    <div className="form-group">
                        <label>Role</label>
                        <div className="checkboxes">
                            <div>
                                <input
                                    id="admin"
                                    type="checkbox"
                                    checked={role === 'admin'}
                                    onChange={() => setRole('admin')}
                                />
                                <label htmlFor="admin">Admin</label>
                            </div>
                            <div>
                                <input
                                    id="user"
                                    type="checkbox"
                                    checked={role === 'user'}
                                    onChange={() => setRole('user')}
                                />
                                <label htmlFor="user">User</label>
                            </div>
                            <div>
                                <input
                                    id="animal"
                                    type="checkbox"
                                    checked={role === 'animal'}
                                    onChange={() => setRole('animal')}
                                />
                                <label htmlFor="animal">Animal</label>
                            </div>
                        </div>
                    </div>
                    <button className="button-18" onClick={save} disabled={loading}>
                        {loading ? 'Saugoma...' : 'Keisti rolę'}
                    </button>
                </div>
            </div>
        </div>
    );
}
