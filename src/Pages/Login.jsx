import React from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Redireciona para o Dashboard (Home)
    navigate('/');
  };

  return (
    <div style={{ padding: '20px', border: '1px solid black', margin: '20px', backgroundColor: '#f9f9f9' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '10px' }}>
          <label>Email:</label><br />
          <input type="email" style={{ border: '1px solid black' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Senha:</label><br />
          <input type="password" style={{ border: '1px solid black' }} />
        </div>
        <button type="submit" style={{ border: '1px solid black', padding: '5px 10px', cursor: 'pointer' }}>
          Entrar
        </button>
      </form>
      <div style={{ marginTop: '10px' }}>
        <a href="/cadastro" style={{ marginRight: '10px' }}>Criar conta</a>
        <a href="/recup-senha">Esqueci a senha</a>
      </div>
    </div>
  );
}

export default Login;
