import React, { type JSX } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App';

import { useAuth } from './store/auth';
import Login from './pages/Login';
import CreatePost from './pages/CreatePost';
import Feed from './pages/Feed';

function Private({ children }: { children: JSX.Element }) {
  const token = useAuth((s) => s.token);
  return token ? children : <Navigate to="/login" replace />;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Private><Feed /></Private>} />
          
          <Route path="/crear" element={<Private><CreatePost /></Private>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

