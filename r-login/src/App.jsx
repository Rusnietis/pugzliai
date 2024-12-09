import { AuthProvider } from './Contexts/Auth';
import { RouterProvider } from './Contexts/Router';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Style/app.scss';

export default function App() {
  return (
    <div className="app">
      <AuthProvider>
        <RouterProvider>
        </RouterProvider>
      </AuthProvider>
    </div>
  );
}


