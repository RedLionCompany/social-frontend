import { Link, Outlet } from 'react-router-dom';
import { useAuth } from './store/auth';

export default function App() {
  const { token, logout } = useAuth();
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 16 }}>
      <nav style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
        {token && <>
          <Link to="/">Feed</Link>
          <Link to="/crear">Crear</Link>
          <Link to="/perfil">Perfil</Link>
          <button onClick={logout}>Salir</button>
        </>}
        {!token && <Link to="/login">Login</Link>}
      </nav>
      <Outlet />
    </div>
  );
}
