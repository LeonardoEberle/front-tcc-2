import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import mockData from '../mock_data.json';
import noImage from '../assets/noimage.jpg';

function MinhasIdeias() {
  const [minhasIdeias, setMinhasIdeias] = useState([]);
  const navigate = useNavigate();
  
  // Simulando que somos o usuário João Silva (usu_id: 1)
  const USUARIO_LOGADO_ID = 1;

  useEffect(() => {
    // Filtrar ideias que pertencem ao João Silva
    const filtradas = mockData.ideias.filter(ideia => ideia.ida_usuario_id === USUARIO_LOGADO_ID);
    setMinhasIdeias(filtradas);
  }, []);

  const containerStyle = {
    padding: '40px 20px',
    maxWidth: '1000px',
    margin: '0 auto'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '25px',
    marginTop: '30px'
  };

  const cardStyle = {
    border: '2px solid #000',
    backgroundColor: '#fff',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    position: 'relative'
  };

  const imageStyle = {
    width: '100%',
    height: '180px',
    objectFit: 'cover',
    border: '1px solid #000'
  };

  const statusBadgeStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: '#000',
    color: '#fff',
    padding: '4px 10px',
    fontSize: '12px',
    fontWeight: 'bold',
    border: '1px solid #fff'
  };

  const titleStyle = {
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#000',
    margin: '0'
  };

  const buttonGroupStyle = {
    display: 'flex',
    gap: '10px',
    marginTop: 'auto',
    paddingTop: '15px',
    borderTop: '2px solid #000'
  };

  const actionButtonStyle = {
    flex: 1,
    padding: '10px',
    border: '2px solid #000',
    backgroundColor: '#fff',
    color: '#000',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '14px'
  };

  const getImageUrl = (imagePath) => {
    if (imagePath.startsWith('http')) return imagePath;
    return noImage;
  };

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #000', paddingBottom: '15px' }}>
        <h1 style={{ color: '#000', margin: 0 }}>Minhas Ideias</h1>
        <button style={{ ...actionButtonStyle, flex: 'none', backgroundColor: '#000', color: '#fff', padding: '10px 25px' }}>
          + Nova Ideia
        </button>
      </div>

      {minhasIdeias.length === 0 ? (
        <p style={{ textAlign: 'center', marginTop: '50px', fontSize: '18px', color: '#000' }}>
          Você ainda não publicou nenhuma ideia.
        </p>
      ) : (
        <div style={gridStyle}>
          {minhasIdeias.map((ideia) => (
            <div key={ideia.ida_id} style={cardStyle}>
              <div style={statusBadgeStyle}>{ideia.ida_status_nome}</div>
              <img 
                src={getImageUrl(ideia.info.ida_info_imagem)} 
                alt={ideia.ida_nome} 
                style={imageStyle} 
              />
              <h2 style={titleStyle}>{ideia.ida_nome}</h2>
              <p style={{ fontSize: '14px', color: '#000', margin: 0 }}>
                Fatia disponível: <strong>{ideia.info.ida_info_fatia}%</strong>
              </p>
              
              <div style={buttonGroupStyle}>
                <button 
                  style={actionButtonStyle}
                  onClick={() => navigate(`/editar-ideia/${ideia.ida_id}`)}
                >
                  Editar
                </button>
                <button style={{ ...actionButtonStyle, backgroundColor: '#000', color: '#fff' }}>Propostas</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MinhasIdeias;
