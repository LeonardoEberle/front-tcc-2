import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import mockData from '../../mock_data.json';
import noImage from '../../assets/noimage.jpg';

function IdeiasList() {
  const [ideias, setIdeias] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulando carregamento de API
    setIdeias(mockData.ideias);
  }, []);

  const containerStyle = {
    padding: '20px',
    maxWidth: '1000px',
    margin: '0 auto'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
    marginTop: '20px'
  };

  const cardStyle = {
    border: '2px solid #000',
    backgroundColor: '#fff',
    padding: '15px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  };

  const imageStyle = {
    width: '100%',
    height: '180px',
    objectFit: 'cover',
    borderBottom: '1px solid #000',
    backgroundColor: '#eee'
  };

  const titleStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#000',
    margin: '0'
  };

  const categoryStyle = {
    fontSize: '12px',
    textTransform: 'uppercase',
    color: '#333',
    fontWeight: 'bold',
    border: '1px solid #000',
    padding: '2px 6px',
    alignSelf: 'flex-start'
  };

  const descriptionStyle = {
    fontSize: '14px',
    color: '#000',
    lineHeight: '1.4',
    height: '60px',
    overflow: 'hidden'
  };

  const fatiaStyle = {
    fontWeight: 'bold',
    fontSize: '16px',
    color: '#000',
    borderTop: '1px solid #000',
    paddingTop: '10px',
    marginTop: 'auto'
  };

  const buttonStyle = {
    backgroundColor: '#000',
    color: '#fff',
    border: '2px solid #000',
    padding: '10px',
    cursor: 'pointer',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '10px'
  };

  const getUserName = (userId) => {
    const user = mockData.usuarios.find(u => u.usu_id === userId);
    return user ? `${user.usu_nome} ${user.usu_sobrenome}` : 'Desconhecido';
  };

  const getImageUrl = (imagePath) => {
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    return noImage;
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ color: '#000', borderBottom: '2px solid #000', paddingBottom: '10px' }}>
        Ideias Publicadas
      </h1>
      
      <div style={gridStyle}>
        {ideias.map((ideia) => (
          <div key={ideia.ida_id} style={cardStyle}>
            <img 
              src={getImageUrl(ideia.info.ida_info_imagem)} 
              alt={ideia.ida_nome} 
              style={imageStyle} 
            />
            <span style={categoryStyle}>{ideia.ida_categoria_nome}</span>
            <h2 style={titleStyle}>{ideia.ida_nome}</h2>
            <p style={{ fontSize: '12px', margin: '0', color: '#555' }}>
              Por: <strong>{getUserName(ideia.ida_usuario_id)}</strong>
            </p>
            <p style={descriptionStyle}>{ideia.info.ida_info_descricao}</p>
            
            <div style={fatiaStyle}>
              Fatia disponível: {ideia.info.ida_info_fatia}%
            </div>
            
            <button 
              style={buttonStyle}
              onClick={() => navigate(`/ideia/${ideia.ida_id}`)}
            >
              Ver Detalhes / Proposta
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default IdeiasList;
