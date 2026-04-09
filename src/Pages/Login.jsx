import React from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Redireciona para o Dashboard (Home)
    navigate('/');
  };

  const containerStyle = {
    padding: '40px 20px',
    maxWidth: '400px',
    margin: '40px auto',
    backgroundColor: '#f5f5f5',
    border: '1px solid #000',
    textAlign: 'center'
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    border: '1px solid #000',
    marginBottom: '15px',
    boxSizing: 'border-box',
    backgroundColor: '#fff',
    color: '#000'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'left'
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    border: '1px solid #000',
    backgroundColor: '#000',
    color: '#fff',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '16px',
    marginTop: '10px'
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ color: '#000', marginBottom: '25px' }}>Entrar no Sistema</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '10px' }}>
          <label style={labelStyle}>Email</label>
          <input type="email" style={inputStyle} required />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={labelStyle}>Senha</label>
          <input type="password" style={inputStyle} required />
        </div>
        <button type="submit" style={buttonStyle}>
          Entrar
        </button>
      </form>
      <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <a href="/cadastro" style={{ color: '#000', fontWeight: 'bold', textDecoration: 'underline' }}>Criar nova conta</a>
        <a href="/recup-senha" style={{ color: '#000', fontSize: '14px' }}>Esqueci minha senha</a>
      </div>
    </div>
  );
}

export default Login;
