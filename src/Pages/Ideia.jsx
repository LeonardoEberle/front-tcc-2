import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import mockData from '../mock_data.json';
import noImage from '../assets/noimage.jpg';

function Ideia() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ideia, setIdeia] = useState(null);
  const [autor, setAutor] = useState(null);

  useEffect(() => {
    const foundIdeia = mockData.ideias.find(i => i.ida_id === parseInt(id));
    if (foundIdeia) {
      setIdeia(foundIdeia);
      const foundAutor = mockData.usuarios.find(u => u.usu_id === foundIdeia.ida_usuario_id);
      setAutor(foundAutor);
    }
  }, [id]);

  if (!ideia) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2 style={{ color: '#000' }}>Ideia não encontrada.</h2>
        <button 
          onClick={() => navigate('/ideias')}
          style={{ padding: '10px 20px', border: '2px solid #000', backgroundColor: '#000', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Voltar para Lista
        </button>
      </div>
    );
  }

  const containerStyle = {
    padding: '40px 20px',
    maxWidth: '900px',
    margin: '0 auto',
    backgroundColor: '#fff',
    border: '2px solid #000',
    marginTop: '20px'
  };

  const sectionStyle = {
    border: '2px solid #000',
    padding: '20px',
    marginBottom: '20px',
    backgroundColor: '#f9f9f9'
  };

  const titleStyle = {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#000',
    margin: '0 0 10px 0',
    borderBottom: '2px solid #000',
    paddingBottom: '10px'
  };

  const labelStyle = {
    fontWeight: 'bold',
    color: '#000',
    fontSize: '14px',
    textTransform: 'uppercase',
    display: 'block',
    marginBottom: '5px'
  };

  const getImageUrl = (imagePath) => {
    if (imagePath.startsWith('http')) return imagePath;
    return noImage;
  };

  return (
    <div style={containerStyle}>
      <button 
        onClick={() => navigate(-1)}
        style={{ marginBottom: '20px', padding: '5px 15px', border: '2px solid #000', backgroundColor: '#fff', color: '#000', cursor: 'pointer', fontWeight: 'bold' }}
      >
        ← Voltar
      </button>

      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        <div style={{ flex: '1', minWidth: '300px' }}>
          <img 
            src={getImageUrl(ideia.info.ida_info_imagem)} 
            alt={ideia.ida_nome} 
            style={{ width: '100%', border: '2px solid #000', height: 'auto' }} 
          />
        </div>
        
        <div style={{ flex: '1.5', minWidth: '300px' }}>
          <span style={{ backgroundColor: '#000', color: '#fff', padding: '4px 10px', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase' }}>
            {ideia.ida_categoria_nome}
          </span>
          <h1 style={titleStyle}>{ideia.ida_nome}</h1>
          <p style={{ fontSize: '18px', color: '#000', margin: '10px 0' }}>
            Autor: <strong>{autor ? `${autor.usu_nome} ${autor.usu_sobrenome}` : 'Desconhecido'}</strong>
          </p>
          
          <div style={{ ...sectionStyle, backgroundColor: '#fff' }}>
            <span style={labelStyle}>Fatia disponível para investimento</span>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#000' }}>{ideia.info.ida_info_fatia}%</div>
          </div>
        </div>
      </div>

      <div style={sectionStyle}>
        <span style={labelStyle}>Descrição Completa</span>
        <p style={{ color: '#000', lineHeight: '1.6', fontSize: '16px' }}>{ideia.info.ida_info_descricao}</p>
      </div>

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        <div style={{ ...sectionStyle, flex: 1 }}>
          <span style={labelStyle}>Pitch (Vídeo)</span>
          <button 
            onClick={() => window.open(ideia.info.ida_info_link_video, '_blank')}
            style={{ width: '100%', padding: '15px', border: '2px solid #000', backgroundColor: '#000', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Assistir Pitch no YouTube
          </button>
        </div>

        <div style={{ ...sectionStyle, flex: 1 }}>
          <span style={labelStyle}>Ação</span>
          <button 
            style={{ width: '100%', padding: '15px', border: '2px solid #000', backgroundColor: '#fff', color: '#000', fontWeight: 'bold', cursor: 'pointer' }}
            onClick={() => alert('Funcionalidade de proposta em breve!')}
          >
            Enviar Proposta
          </button>
        </div>
      </div>
    </div>
  );
}

export default Ideia;
