import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './Style/app.scss';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './Contexts/Auth.jsx';


createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <AuthProvider>
            <App />
        </AuthProvider>
    </BrowserRouter>

)
