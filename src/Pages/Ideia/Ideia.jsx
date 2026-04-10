import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import mockData from '../../mock_data.json';
import noImage from '../../assets/noimage.jpg';
import styles from './Ideia.module.css';

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
      <div className={styles.page}>
        <div className={styles.container} style={{ textAlign: 'center' }}>
          <h2 style={{ color: '#0d47a1' }}>Ideia não encontrada.</h2>
          <button onClick={() => navigate('/ideias')} className={styles.buttonPrimary}>
            Voltar para Lista
          </button>
        </div>
      </div>
    );
  }

  const getImageUrl = (imagePath) => {
    if (imagePath && imagePath.startsWith('http')) return imagePath;
    return noImage;
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <img 
            src={getImageUrl(ideia.info.ida_info_imagem)} 
            alt={ideia.ida_nome} 
            className={styles.image} 
          />
          <div className={styles.mainInfo}>
            <h1 className={styles.title}>{ideia.ida_nome}</h1>
            <span className={styles.author}>
              Por: <strong>{autor ? `${autor.usu_nome} ${autor.usu_sobrenome}` : 'Carregando...'}</strong>
            </span>
            <div className={styles.badge}>
              <span style={{ fontSize: '12px', display: 'block', fontWeight: 400 }}>Fatia Disponível</span>
              {ideia.info.ida_info_fatia}%
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <span className={styles.label}>Sobre o Projeto</span>
          <p className={styles.description}>{ideia.info.ida_info_descricao}</p>
        </div>

        <div className={styles.actionsGrid}>
          <div className={styles.actionCard}>
            <span className={styles.label}>Apresentação</span>
            <button 
              onClick={() => window.open(ideia.info.ida_info_link_video, '_blank')}
              className={styles.buttonPrimary}
            >
              Assistir Pitch no YouTube
            </button>
          </div>

          <div className={styles.actionCard}>
            <span className={styles.label}>Interesse</span>
            <button className={styles.buttonSecondary}>
              Entrar em Contato
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ideia;