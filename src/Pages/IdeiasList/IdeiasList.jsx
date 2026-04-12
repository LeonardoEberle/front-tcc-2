import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import mockData from '../../mock_data.json';
import noImage from '../../assets/noimage.jpg';
import styles from './IdeiasList.module.css';

function IdeiasList() {
  const [ideias, setIdeias] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setIdeias(mockData.ideias);
  }, []);

  const getUserName = (userId) => {
    const user = mockData.usuarios.find(u => u.usu_id === userId);
    return user ? `${user.usu_nome} ${user.usu_sobrenome}` : 'Desconhecido';
  };

  const getImageUrl = (imagePath) => {
    if (imagePath && imagePath.startsWith('http')) return imagePath;
    return noImage;
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.headerTitle}>Ideias Publicadas</h1>
        
        <div className={styles.grid}>
          {ideias.map((ideia) => (
            <div key={ideia.ida_id} className={styles.card}>
              <div className={styles.imageContainer}>
                <img 
                  src={getImageUrl(ideia.info.ida_info_imagem)} 
                  alt={ideia.ida_nome} 
                  className={styles.image} 
                />
                <span className={styles.categoryBadge}>{ideia.ida_categoria_nome}</span>
              </div>

              <div className={styles.content}>
                <h2 className={styles.title}>{ideia.ida_nome}</h2>
                <p className={styles.author}>
                  Por: <strong>{getUserName(ideia.ida_usuario_id)}</strong>
                </p>
                <p className={styles.description}>{ideia.info.ida_info_descricao}</p>
                
                <div className={styles.footerInfo}>
                  <div className={styles.fatiaText}>
                    Fatia: <span className={styles.fatiaValue}>{ideia.info.ida_info_fatia}%</span>
                  </div>
                  <button 
                    className={styles.button}
                    onClick={() => navigate(`/ideia/${ideia.ida_id}`)}
                  >
                    Detalhes
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default IdeiasList;