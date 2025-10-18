import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users } from '../../Contexts/Users.jsx';
import { v4 as uuidv4 } from 'uuid';
import '../../Style/fruits.scss';

export default function Create() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setCreateUser } = useContext(Users);
  const navigate = useNavigate(); // React Router redirect

  const register = () => {
    if (!username || !password) {
      alert('Įveskite vartotojo vardą ir slaptažodį.');
      return;
    }

    const user = {
      id: uuidv4(),
      username,
      password
    };

    // Pridedame vartotoją per Users kontekstą
    setCreateUser(user);

    // Nukreipiame į login puslapį
    navigate('/login');
  };

  return (
    <div className="create-page">
      <h1>Registracija</h1>
      <div className="fruits-bin">
        <form
          className="form"
          onSubmit={e => {
            e.preventDefault(); // sustabdyti default submit
            register();
          }}
        >
          <div className="form-group">
            <label>Vartotojo vardas</label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Įveskite vartotojo vardą"
            />
          </div>

          <div className="form-group">
            <label>Slaptažodis</label>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Įveskite slaptažodį"
            />
          </div>

          <div className="buttons">
            <button type="submit" className="yellow">
              Registracija
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
