import { useEffect } from 'react';
import { usePosts } from '../store/posts';

export default function Feed() {
  const { list, load, like, loading } = usePosts();
  useEffect(() => { load(); }, []);
  if (loading || !list) return <p>Cargando…</p>;

  return (
    <div>
      <h2>Publicaciones</h2>
      {list.items.map(p => (
        <div key={p.id} style={{ border:'1px solid #ddd', padding:12, margin:'8px 0' }}>
          <div><b>@{p.author.alias}</b> • {new Date(p.createdAt).toLocaleString()}</div>
          <p>{p.message}</p>
          <button onClick={() => like(p.id)}>
            👍 {p._count?.likes ?? 0}
          </button>
        </div>
      ))}
      <div style={{ marginTop: 10 }}>
        Página {list.page} de {Math.ceil(list.total / list.size)}
      </div>
    </div>
  );
}
