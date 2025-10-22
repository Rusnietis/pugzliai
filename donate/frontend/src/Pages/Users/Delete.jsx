import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Users } from '../../Contexts/Users';

export default function Delete() {
  const { id } = useParams(); // <-- Gauta iš URL pvz. /register/delete/:id
  const navigate = useNavigate(); // <-- vietoj window.location.href
  const { users, setUsers, setDeleteUser } = useContext(Users);

  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!users) return;

    const foundUser = users.find(u => u.id === parseInt(id));
    setUser(foundUser || null);
  }, [users, id]);

  const doDelete = () => {
    if (!user) return;

    // Pažymim ištrintą vartotoją vizualiai (nebūtina, bet naudinga UX)
    setUsers(prev => prev.map(u => u.id === user.id ? { ...u, deleting: true } : u));

    // Iškviečiam backend DELETE (jei turi axios – čia paprastai būtų POST ar DELETE request)
    setDeleteUser(user.id);

    // Naviguojam atgal į sąrašą
    navigate('/register/list');
  };

  if (!users) {
    return <h1>Kraunama...</h1>;
  }

  if (!user) {
    return <h1>Vartotojas nerastas</h1>;
  }

  return (
    <div className="page-users">

      <div className="row" >
        <h1>
          Patvirtinkite vartotojo ištrynimą:{' '}
          <b style={{ color: 'red' }}>{user.name}</b>
        </h1>
        <div className="button">
          <button className="button-18" style={{ backgroundColor: 'red' }} onClick={doDelete}>
            Ištrinti
          </button>
          <button className="button-18" style={{ backgroundColor: 'green' }} onClick={() => navigate('/register/list')}>
            Atšaukti
          </button>
        </div>
      </div>
    </div>
  );
}
