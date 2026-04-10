import React from 'react';
import { useNavigate } from 'react-router-dom';

function RecupSenha() {
  const navigate = useNavigate();

  const handleRecuperar = (e) => {
    e.preventDefault();
    alert('Email de recuperação enviado!');
    navigate('/login');
  };

  return (
    <div style={{ padding: '20px', border: '1px solid black', margin: '20px', backgroundColor: '#f9f9f9' }}>
      <h1>Recuperar Senha</h1>
      <form onSubmit={handleRecuperar}>
        <div style={{ marginBottom: '10px' }}>
          <label>Email:</label><br />
          <input type="email" style={{ border: '1px solid black' }} />
        </div>
        <button type="submit" style={{ border: '1px solid black', padding: '5px 10px', cursor: 'pointer' }}>
          Enviar link
        </button>
      </form>
      <div style={{ marginTop: '10px' }}>
        <a href="/login">Voltar para Login</a>
      </div>
    </div>
  );
}

export default RecupSenha;
