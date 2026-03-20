import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './Style/app.scss';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './Contexts/Auth.jsx';
import { MessagesProvider } from './Contexts/Messages.jsx';
import { ToastProvider } from './Contexts/Toast.jsx';



createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <ToastProvider>
            <AuthProvider>
                <App />
            </AuthProvider>
        </ToastProvider>
    </BrowserRouter>

)
