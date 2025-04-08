import { RouterProvider } from './Contexts/Router';
import {AuthProvider} from './Contexts/Auth'


export default function App() {
  return (
    <AuthProvider>
      <RouterProvider>
      </RouterProvider>
    </AuthProvider>
  )
}


