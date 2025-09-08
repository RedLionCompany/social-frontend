import { useState } from 'react';
import { useAuth } from '../store/auth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [alias, setAlias] = useState('');
  const [email, setEmail] = useState('');   // puedes usar uno u otro
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const login = useAuth((s) => s.login);
  const nav = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login({ alias: alias || undefined, email: email || undefined, password });
      nav('/');
    } catch (e) {
      alert('Credenciales inválidas');
    } finally { setLoading(false); }
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>Login</h2>
      <p>Puedes usar alias o email + password</p>
      <input placeholder="alias" value={alias} onChange={e=>setAlias(e.target.value)} />
      <div>o</div>
      <input placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input placeholder="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button disabled={loading}>{loading ? 'Entrando...' : 'Entrar'}</button>
    </form>
  );
}
