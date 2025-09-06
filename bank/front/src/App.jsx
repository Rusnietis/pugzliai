import { RouterProvider } from './Contexts/Router';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Style/app.scss';
import { AuthProvider } from './Contexts/Auth';

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider>
      </RouterProvider>
    </AuthProvider>
  )
}


