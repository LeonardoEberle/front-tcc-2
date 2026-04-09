import React from 'react';
import { useNavigate } from 'react-router-dom';

function Cadastro() {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <div style={{ padding: '20px', border: '1px solid black', margin: '20px', backgroundColor: '#f9f9f9' }}>
      <h1>Cadastro</h1>
      <form onSubmit={handleRegister}>
        <div style={{ marginBottom: '10px' }}>
          <label>Nome:</label><br />
          <input type="text" style={{ border: '1px solid black' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Email:</label><br />
          <input type="email" style={{ border: '1px solid black' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Senha:</label><br />
          <input type="password" style={{ border: '1px solid black' }} />
        </div>
        <button type="submit" style={{ border: '1px solid black', padding: '5px 10px', cursor: 'pointer' }}>
          Registrar
        </button>
      </form>
      <div style={{ marginTop: '10px' }}>
        <a href="/login">Já tenho uma conta</a>
      </div>
    </div>
  );
}

export default Cadastro;
