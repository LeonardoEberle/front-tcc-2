import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import mockData from '../../mock_data.json';
import noImage from '../../assets/noimage.jpg';
import styles from './Dashboard.module.css';

function Dashboard() {
  const [randomIdeias, setRandomIdeias] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const shuffled = [...mockData.ideias].sort(() => 0.5 - Math.random());
    setRandomIdeias(shuffled.slice(0, 4));
  }, []);

  const getImageUrl = (imagePath) => {
    if (imagePath && imagePath.startsWith('http')) return imagePath;
    return noImage;
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Dashboard</h1>
          <p className={styles.subtitle}>Bem-vindo ao sistema de Pitch estilo Shark Tank!</p>
        </div>
        
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>
          Ideias em Destaque
          </h3>
          <div className={styles.grid}>
            {randomIdeias.map(ideia => (
              <div key={ideia.ida_id} className={styles.card}>
                <img 
                  src={getImageUrl(ideia.info.ida_info_imagem)} 
                  alt={ideia.ida_nome} 
                  className={styles.image} 
                />
                <h4 className={styles.cardTitle}>{ideia.ida_nome}</h4>
                <p className={styles.fatia}>Fatia: {ideia.info.ida_info_fatia}%</p>
                <button 
                  className={styles.button}
                  onClick={() => navigate(`/ideia/${ideia.ida_id}`)}
                >
                  Ver Detalhes
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;