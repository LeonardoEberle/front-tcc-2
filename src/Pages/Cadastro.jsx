import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Cadastro() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    usu_nome: '',
    usu_sobrenome: '',
    usu_cpf: '',
    usu_email: '',
    usu_telefone: '',
    usu_senha: '',
    confirmar_senha: '',
    usu_cargo_id: '2' // Default para Empreendedor (1=Adm, 2=Empreendedor, 3=Investidor)
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    
    if (formData.usu_senha !== formData.confirmar_senha) {
      alert('As senhas não coincidem!');
      return;
    }

    console.log('Dados para a API:', formData);
    alert('Cadastro realizado com sucesso (simulação)!');
    navigate('/login');
  };

  const inputStyle = {
    width: '100%',
    padding: '8px',
    border: '1px solid #000',
    marginBottom: '10px',
    boxSizing: 'border-box',
    backgroundColor: '#fff',
    color: '#000'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
    color: '#000' // Preto puro para máximo contraste
  };

  const sectionStyle = {
    border: '1px solid #000',
    padding: '15px',
    marginBottom: '20px',
    backgroundColor: '#fff'
  };

  const titleStyle = {
    textAlign: 'center',
    color: '#000', // Preto puro
    marginBottom: '20px'
  };

  const subTitleStyle = {
    color: '#000',
    marginTop: '0'
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    border: '1px solid #000',
    backgroundColor: '#000', // Fundo preto
    color: '#fff', // Texto branco para alto contraste
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '16px'
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '20px auto', backgroundColor: '#f5f5f5', border: '1px solid #000' }}>
      <h1 style={titleStyle}>Criar Nova Conta</h1>
      
      <form onSubmit={handleRegister}>
        {/* Dados de Usuário (usu_usuario) */}
        <div style={sectionStyle}>
          <h3 style={subTitleStyle}>Dados de Acesso</h3>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Nome</label>
              <input type="text" name="usu_nome" style={inputStyle} value={formData.usu_nome} onChange={handleChange} required />
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Sobrenome</label>
              <input type="text" name="usu_sobrenome" style={inputStyle} value={formData.usu_sobrenome} onChange={handleChange} required />
            </div>
          </div>

          <label style={labelStyle}>CPF</label>
          <input type="text" name="usu_cpf" placeholder="000.000.000-00" style={inputStyle} value={formData.usu_cpf} onChange={handleChange} required />

          <label style={labelStyle}>Email</label>
          <input type="email" name="usu_email" style={inputStyle} value={formData.usu_email} onChange={handleChange} required />

          <label style={labelStyle}>Telefone</label>
          <input type="tel" name="usu_telefone" placeholder="(00) 00000-0000" style={inputStyle} value={formData.usu_telefone} onChange={handleChange} required />

          <label style={labelStyle}>Senha</label>
          <input type="password" name="usu_senha" style={inputStyle} value={formData.usu_senha} onChange={handleChange} required />

          <label style={labelStyle}>Confirmar Senha</label>
          <input type="password" name="confirmar_senha" style={inputStyle} value={formData.confirmar_senha} onChange={handleChange} required />

          <label style={labelStyle}>Tipo de Perfil</label>
          <select name="usu_cargo_id" style={inputStyle} value={formData.usu_cargo_id} onChange={handleChange}>
            <option value="2">Empreendedor (ME)</option>
            <option value="3">Investidor</option>
          </select>
        </div>

        <button type="submit" style={buttonStyle}>
          Finalizar Cadastro
        </button>
      </form>

      <div style={{ marginTop: '15px', textAlign: 'center' }}>
        <a href="/login" style={{ color: '#000', fontWeight: 'bold' }}>Já possui uma conta? Entrar</a>
      </div>
    </div>
  );
}

export default Cadastro;
