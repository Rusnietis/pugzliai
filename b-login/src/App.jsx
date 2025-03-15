
import { AuthProvider } from './Contexts/Auth';
import { RouterProvider } from './Contexts/Router';
import { MessageProvider } from './Contexts/Message';
import MessageAlert from './Pages/MessageAlert';

import './Style/app.scss';

export default function App() {
  return (
    <div className="app">

      <AuthProvider>
        <MessageProvider>
          <MessageAlert />
          <RouterProvider>

          </RouterProvider>
        </MessageProvider>
      </AuthProvider>
    </div>
  );
}


