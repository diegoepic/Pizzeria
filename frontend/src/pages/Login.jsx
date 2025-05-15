import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return setErr(true), setMsg('Todos los campos son obligatorios.');
    if (password.length < 6) return setErr(true), setMsg('La contraseña debe tener al menos 6 caracteres.');
    setErr(false);
    setMsg('Login exitoso.');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div><label>Email:</label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} /></div>
      <div><label>Contraseña:</label><input type="password" value={password} onChange={e=>setPassword(e.target.value)} /></div>
      <button type="submit">Enviar</button>
      {msg && <p className={err ? 'error' : 'success'}>{msg}</p>}
    </form>
  );
};

export default Login;
