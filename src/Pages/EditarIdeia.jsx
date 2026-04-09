import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import mockData from '../mock_data.json';

function EditarIdeia() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ida_nome: '',
    ida_categoria_nome: '',
    ida_info_descricao: '',
    ida_info_fatia: 0,
    ida_info_link_video: ''
  });

  useEffect(() => {
    const ideia = mockData.ideias.find(i => i.ida_id === parseInt(id));
    if (ideia) {
      setFormData({
        ida_nome: ideia.ida_nome,
        ida_categoria_nome: ideia.ida_categoria_nome,
        ida_info_descricao: ideia.info.ida_info_descricao,
        ida_info_fatia: ideia.info.ida_info_fatia,
        ida_info_link_video: ideia.info.ida_info_link_video
      });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log('Ideia atualizada:', formData);
    alert('Ideia atualizada com sucesso (simulação)!');
    navigate('/minhas-ideias');
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
    backgroundColor: '#000',
    color: '#fff',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '16px',
    marginTop: '10px'
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ textAlign: 'center', color: '#000', marginBottom: '30px', borderBottom: '2px solid #000', paddingBottom: '10px' }}>
        Editar Minha Ideia
      </h1>
      
      <form onSubmit={handleSave}>
        <label style={labelStyle}>Nome da Ideia</label>
        <input type="text" name="ida_nome" value={formData.ida_nome} onChange={handleChange} style={inputStyle} required />

        <label style={labelStyle}>Categoria</label>
        <input type="text" name="ida_categoria_nome" value={formData.ida_categoria_nome} onChange={handleChange} style={inputStyle} required />

        <label style={labelStyle}>Fatia Disponível (%)</label>
        <input type="number" name="ida_info_fatia" value={formData.ida_info_fatia} onChange={handleChange} style={inputStyle} required />

        <label style={labelStyle}>Link do Vídeo (Pitch)</label>
        <input type="text" name="ida_info_link_video" value={formData.ida_info_link_video} onChange={handleChange} style={inputStyle} required />

        <label style={labelStyle}>Descrição Completa</label>
        <textarea 
          name="ida_info_descricao" 
          value={formData.ida_info_descricao} 
          onChange={handleChange} 
          style={{ ...inputStyle, height: '120px', resize: 'none' }} 
          required
        />

        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit" style={buttonStyle}>
            Salvar Alterações
          </button>
          <button type="button" onClick={() => navigate('/minhas-ideias')} style={{ ...buttonStyle, backgroundColor: '#fff', color: '#000' }}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditarIdeia;
