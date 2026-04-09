import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import mockData from '../mock_data.json';
import noImage from '../assets/noimage.jpg';

function Dashboard() {
  const [randomIdeias, setRandomIdeias] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Pegar 4 ideias aleatórias
    const shuffled = [...mockData.ideias].sort(() => 0.5 - Math.random());
    setRandomIdeias(shuffled.slice(0, 4));
  }, []);

  const containerStyle = {
    padding: '40px 20px',
    maxWidth: '1000px',
    margin: '0 auto',
    textAlign: 'center'
  };

  const sectionStyle = {
    border: '2px solid #000',
    padding: '20px',
    marginTop: '30px',
    backgroundColor: '#fff',
    textAlign: 'left'
  };

  const titleStyle = {
    color: '#000',
    fontSize: '32px',
    fontWeight: 'bold',
    margin: '0 0 15px 0'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '20px',
    marginTop: '20px'
  };

  const cardStyle = {
    border: '2px solid #000',
    padding: '10px',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    gap: '5px'
  };

  const imageStyle = {
    width: '100%',
    height: '120px',
    objectFit: 'cover',
    borderBottom: '1px solid #000'
  };

  const getImageUrl = (imagePath) => {
    if (imagePath.startsWith('http')) return imagePath;
    return noImage;
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Dashboard</h1>
      <p style={{ color: '#000', fontSize: '18px' }}>Bem-vindo ao sistema de Pitch estilo Shark Tank!</p>
      
      <div style={sectionStyle}>
        <h3 style={{ ...titleStyle, fontSize: '24px', borderBottom: '2px solid #000', paddingBottom: '10px' }}>
          Ideias em Destaque
        </h3>
        <div style={gridStyle}>
          {randomIdeias.map(ideia => (
            <div key={ideia.ida_id} style={cardStyle}>
              <img src={getImageUrl(ideia.info.ida_info_imagem)} alt={ideia.ida_nome} style={imageStyle} />
              <h4 style={{ margin: '5px 0', color: '#000', fontSize: '16px' }}>{ideia.ida_nome}</h4>
              <p style={{ fontSize: '12px', color: '#000', margin: '0' }}>Fatia: {ideia.info.ida_info_fatia}%</p>
              <button 
                style={{ 
                  marginTop: '10px', 
                  backgroundColor: '#000', 
                  color: '#fff', 
                  border: 'none', 
                  padding: '5px', 
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
                onClick={() => navigate(`/ideia/${ideia.ida_id}`)}
              >
                Ver mais
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
