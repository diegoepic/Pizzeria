import React, { useState } from 'react';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || !confirm) return setErr(true), setMsg('Todos los campos son obligatorios.');
    if (password.length < 6) return setErr(true), setMsg('La contraseña debe tener al menos 6 caracteres.');
    if (password !== confirm) return setErr(true), setMsg('Las contraseñas no coinciden.');
    setErr(false);
    setMsg('Registro exitoso.');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registro</h2>
      <div><label>Email:</label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} /></div>
      <div><label>Contraseña:</label><input type="password" value={password} onChange={e=>setPassword(e.target.value)} /></div>
      <div><label>Confirmar:</label><input type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} /></div>
      <button type="submit">Enviar</button>
      {msg && <p className={err ? 'error' : 'success'}>{msg}</p>}
    </form>
  );
};

export default Register;
