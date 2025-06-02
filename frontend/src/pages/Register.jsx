// frontend/src/pages/Register.jsx

import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const { register } = useUser();
  const navigate = useNavigate();

  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm]   = useState('');
  const [msg, setMsg]           = useState('');
  const [err, setErr]           = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setErr(false);
    setMsg('');

    if (!email || !password || !confirm) {
      setErr(true);
      return setMsg('Todos los campos son obligatorios.');
    }
    if (password.length < 6) {
      setErr(true);
      return setMsg('La contraseña debe tener al menos 6 caracteres.');
    }
    if (password !== confirm) {
      setErr(true);
      return setMsg('Las contraseñas no coinciden.');
    }

    const { success, message } = await register(email, password);
    if (success) {
      navigate('/profile');
    } else {
      setErr(true);
      setMsg(message);
    }
  };

  return (
    <div className="form-container">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
      {msg && <p className={err ? 'error' : 'success'}>{msg}</p>}
    </div>
  );
}
