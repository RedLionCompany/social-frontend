import { useState } from 'react';
import { usePosts } from '../store/posts';
import { useNavigate } from 'react-router-dom';

export default function CreatePost() {
  const [message, setMessage] = useState('');
  const create = usePosts(s => s.create);
  const nav = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await create(message);
    nav('/');
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>Nueva publicación</h2>
      <textarea value={message} onChange={e=>setMessage(e.target.value)} rows={4} />
      <br/>
      <button>Publicar</button>
    </form>
  );
}
