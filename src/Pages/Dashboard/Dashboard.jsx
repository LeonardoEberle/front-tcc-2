import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket, ChevronRight, Star, Lightbulb, Compass } from 'lucide-react'; 
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
      {/* Elementos decorativos de fundo para tirar o "branco" sem usar degradê no corpo todo */}
      <div className={styles.blob}></div>
      
      <div className={styles.container}>
        <header className={styles.header}>
  <div className={styles.welcomeText}>
    {/* Ícone agora alinhado ao lado do texto */}
    <h1 className={styles.title}>
      <Compass className={styles.headerIcon} size={36} />
      <span>Descobrir Ideias</span>
    </h1>
    <p className={styles.subtitle}>As mentes mais brilhantes prontas para o próximo passo.</p>
  </div>
</header>

<section className={styles.section}>
  <div className={styles.sectionHeader}>
    {/* Texto de curadoria mais estilizado */}
    <h3 className={styles.sectionTitle}>
      <div className={styles.starCircle}>
        <Star size={18} fill="#f59e0b" color="#f59e0b" />
      </div>
      <span>Curadoria <span className={styles.highlight}>Shark</span></span>
    </h3>
    <button className={styles.viewAll} onClick={() => navigate('/ideias')}>
      Explorar tudo <ChevronRight size={16} />
    </button>
  </div>

          <div className={styles.grid}>
            {randomIdeias.map(ideia => (
              <article key={ideia.ida_id} className={styles.card}>
                <div className={styles.imageWrapper}>
                  <img 
                    src={getImageUrl(ideia.info.ida_info_imagem)} 
                    alt={ideia.ida_nome} 
                    className={styles.image} 
                  />
                  <span className={styles.equityBadge}>{ideia.info.ida_info_fatia}% Equity</span>
                </div>
                
                <div className={styles.content}>
                  <div className={styles.cardTop}>
                    <Lightbulb size={14} className={styles.lightIcon} />
                    <h4 className={styles.cardTitle}>{ideia.ida_nome}</h4>
                  </div>
                  
                  <p className={styles.description}>
                    Oportunidade de investimento em setor estratégico com alto potencial de escala.
                  </p>
                  
                  <button 
                    className={styles.cardButton}
                    onClick={() => navigate(`/ideia/${ideia.ida_id}`)}
                  >
                    <span>Ver Pitch</span>
                    <Rocket size={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;