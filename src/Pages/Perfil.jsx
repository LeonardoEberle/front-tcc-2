import React, { useState } from 'react';
import mockData from '../mock_data.json';

function Perfil() {
  // Simulando que somos o usuário João Silva (usu_id: 1)
  const joao = mockData.usuarios.find(u => u.usu_id === 1);
  
  const [formData, setFormData] = useState({
    usu_nome: joao.usu_nome,
    usu_sobrenome: joao.usu_sobrenome,
    usu_email: joao.usu_email,
    usu_cpf: '000.111.222-33', // Dados fictícios não presentes no mock
    usu_telefone: '(11) 99999-8888',
    usu_perfil_descricao: 'Empreendedor apaixonado por tecnologia e sustentabilidade.',
    usu_perfil_cep: '01001-000',
    usu_perfil_data_nasc: '1990-01-01',
    usu_perfil_link_redes: 'linkedin.com/in/joaosilva'
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    alert('Perfil atualizado com sucesso!');
  };

  const containerStyle = {
    padding: '40px 20px',
    maxWidth: '600px',
    margin: '40px auto',
    backgroundColor: '#fff',
    border: '2px solid #000',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    border: '2px solid #000',
    marginBottom: '15px',
    boxSizing: 'border-box',
    backgroundColor: isEditing ? '#fff' : '#eee',
    color: '#000',
    fontSize: '16px',
    fontWeight: 'bold'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
    color: '#000',
    fontSize: '14px'
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    border: '2px solid #000',
    backgroundColor: isEditing ? '#000' : '#fff',
    color: isEditing ? '#fff' : '#000',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '16px',
    marginTop: '10px'
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ textAlign: 'center', color: '#000', marginBottom: '30px', borderBottom: '2px solid #000', paddingBottom: '10px' }}>
        Meu Perfil
      </h1>
      
      <form onSubmit={handleSave}>
        <div style={{ display: 'flex', gap: '15px' }}>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Nome</label>
            <input type="text" name="usu_nome" value={formData.usu_nome} onChange={handleChange} style={inputStyle} disabled={!isEditing} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Sobrenome</label>
            <input type="text" name="usu_sobrenome" value={formData.usu_sobrenome} onChange={handleChange} style={inputStyle} disabled={!isEditing} />
          </div>
        </div>

        <label style={labelStyle}>Email</label>
        <input type="email" name="usu_email" value={formData.usu_email} onChange={handleChange} style={inputStyle} disabled={!isEditing} />

        <label style={labelStyle}>CPF</label>
        <input type="text" name="usu_cpf" value={formData.usu_cpf} onChange={handleChange} style={inputStyle} disabled={!isEditing} />

        <label style={labelStyle}>Telefone</label>
        <input type="text" name="usu_telefone" value={formData.usu_telefone} onChange={handleChange} style={inputStyle} disabled={!isEditing} />

        <label style={labelStyle}>Data de Nascimento</label>
        <input type="date" name="usu_perfil_data_nasc" value={formData.usu_perfil_data_nasc} onChange={handleChange} style={inputStyle} disabled={!isEditing} />

        <label style={labelStyle}>CEP</label>
        <input type="text" name="usu_perfil_cep" value={formData.usu_perfil_cep} onChange={handleChange} style={inputStyle} disabled={!isEditing} />

        <label style={labelStyle}>Redes Sociais (Link)</label>
        <input type="text" name="usu_perfil_link_redes" value={formData.usu_perfil_link_redes} onChange={handleChange} style={inputStyle} disabled={!isEditing} />

        <label style={labelStyle}>Descrição / Bio</label>
        <textarea 
          name="usu_perfil_descricao" 
          value={formData.usu_perfil_descricao} 
          onChange={handleChange} 
          style={{ ...inputStyle, height: '100px', resize: 'none' }} 
          disabled={!isEditing} 
        />

        {!isEditing ? (
          <button type="button" onClick={() => setIsEditing(true)} style={buttonStyle}>
            Editar Perfil
          </button>
        ) : (
          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" style={buttonStyle}>
              Salvar Alterações
            </button>
            <button type="button" onClick={() => setIsEditing(false)} style={{ ...buttonStyle, backgroundColor: '#fff', color: '#000' }}>
              Cancelar
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default Perfil;