import { useContext } from 'react';
import { Link } from 'react-router-dom'; // 👈 nauja eilutė
import { Users } from '../../Contexts/Users';
import User from './User';

export default function List() {
  const { users } = useContext(Users);

  if (!users)
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );

  if (users.error)
    return (
      <div>
        <h1>Serverio klaida</h1>
      </div>
    );

  return (
    <div>
      <h1>Vartotojų sąrašas</h1>

      {/* 👇 Pridedam mygtuką, kuris nuveda į Create puslapį */}
      <div style={{ marginBottom: '20px' }}>
        <Link
          to="create"
          style={{
            backgroundColor: '#f1c40f',
            padding: '10px 15px',
            borderRadius: '8px',
            textDecoration: 'none',
            color: '#000',
            fontWeight: 'bold'
          }}
        >
          ➕ Naujas vartotojas
        </Link>
      </div>

      <div className="users-box">
        {users.map(user => (
          <User key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
