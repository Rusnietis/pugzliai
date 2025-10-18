import { Routes, Route, Navigate } from 'react-router-dom';
import { UsersProvider } from '../../Contexts/Users.jsx';
import Create from './Create.jsx';
import List from './List.jsx';
import Edit from './Edit.jsx';
import Delete from './Delete.jsx';
import Page404 from '../Page404.jsx';

export default function RegisterIndex() {
  return (
    <UsersProvider>
      <Routes>
        {/* Kai atidarai /register, iškart peradresuoja į /register/create */}
        <Route index element={<Navigate to="create" replace />} />

        {/* Registracija */}
        <Route path="create" element={<Create />} />

        {/* Kiti CRUD keliai (jei ateityje norėsi) */}
        <Route path="list" element={<List />} />
        <Route path="edit/:id" element={<Edit />} />
        <Route path="delete/:id" element={<Delete />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </UsersProvider>
  );
}
