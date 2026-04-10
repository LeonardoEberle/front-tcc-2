import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import mockData from '../../mock_data.json';
import noImage from '../../assets/noimage.jpg';
import styles from './MinhasIdeias.module.css';

function MinhasIdeias() {
  const [minhasIdeias, setMinhasIdeias] = useState([]);
  const navigate = useNavigate();
  const USUARIO_LOGADO_ID = 1;

  useEffect(() => {
    const filtradas = mockData.ideias.filter(ideia => ideia.ida_usuario_id === USUARIO_LOGADO_ID);
    setMinhasIdeias(filtradas);
  }, []);

  const getImageUrl = (imagePath) => {
    if (imagePath && imagePath.startsWith('http')) return imagePath;
    return noImage;
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Minhas Ideias</h1>
          <button className={styles.btnNew} onClick={() => navigate('/criar-ideia')}>
            + Nova Ideia
          </button>
        </div>

        {minhasIdeias.length === 0 ? (
          <p style={{ color: 'white', textAlign: 'center', marginTop: '50px' }}>
            Você ainda não publicou nenhuma ideia.
          </p>
        ) : (
          <div className={styles.grid}>
            {minhasIdeias.map((ideia) => (
              <div key={ideia.ida_id} className={styles.card}>
                <div className={styles.statusBadge}>{ideia.ida_status_nome}</div>
                <img 
                  src={getImageUrl(ideia.info.ida_info_imagem)} 
                  alt={ideia.ida_nome} 
                  className={styles.image} 
                />
                <div className={styles.content}>
                  <h2 className={styles.cardTitle}>{ideia.ida_nome}</h2>
                  <p className={styles.fatiaInfo}>
                    Fatia disponível: <strong>{ideia.info.ida_info_fatia}%</strong>
                  </p>
                  
                  <div className={styles.buttonGroup}>
                    <button 
                      className={styles.btnSecondary}
                      onClick={() => navigate(`/editar-ideia/${ideia.ida_id}`)}
                    >
                      Editar
                    </button>
                    <button 
                      className={styles.btnPrimary}
                      onClick={() => navigate(`/ideia/${ideia.ida_id}`)}
                    >
                      Ver Detalhes
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MinhasIdeias;