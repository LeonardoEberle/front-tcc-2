import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, Star, ChevronRight } from 'lucide-react'; 
import mockData from '../../mock_data.json';
import IdeiaCard from '../../Components/IdeiaCard/IdeiaCard';
import styles from './Dashboard.module.css';

function Dashboard() {
  const [randomIdeias, setRandomIdeias] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const shuffled = [...mockData.ideias].sort(() => 0.5 - Math.random());
    setRandomIdeias(shuffled.slice(0, 4));
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.blob}></div>
      
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.welcomeText}>
            <h1 className={styles.title}>
              <Compass className={styles.headerIcon} size={36} />
              <span>Descobrir Ideias</span>
            </h1>
            <p className={styles.subtitle}>As mentes mais brilhantes prontas para o próximo passo.</p>
          </div>
        </header>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
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
              <IdeiaCard 
                key={ideia.ida_id} 
                ideia={ideia} 
                variant="dashboard" 
                onAction={() => navigate(`/ideia/${ideia.ida_id}`)}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
