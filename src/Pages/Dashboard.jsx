import React from 'react';

function Dashboard() {
  return (
    <div style={{ padding: '20px', border: '1px solid black', margin: '20px', backgroundColor: '#f9f9f9' }}>
      <h1>Dashboard</h1>
      <p>Bem-vindo ao sistema de Pitch estilo Shark Tank!</p>
      <div style={{ border: '1px solid black', padding: '10px', marginTop: '10px' }}>
        <h3>Resumo da Atividade</h3>
        <p>Aqui você verá um resumo das suas ideias e propostas.</p>
      </div>
    </div>
  );
}

export default Dashboard;
