import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, PlayCircle, MessageSquare, Info, User, PieChart } from 'lucide-react';
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
      <div className={styles.blob}></div>
      
      <div className={styles.container}>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          <ChevronLeft size={20} /> Voltar
        </button>

        <header className={styles.header}>
          <div className={styles.imageWrapper}>
            <img 
              src={getImageUrl(ideia.info.ida_info_imagem)} 
              alt={ideia.ida_nome} 
              className={styles.image} 
            />
            <div className={styles.equityBadge}>
              <PieChart size={16} />
              <span>{ideia.info.ida_info_fatia}% Equity</span>
            </div>
          </div>

          <div className={styles.mainInfo}>
            <div className={styles.categoryBadge}>{ideia.ida_categoria_nome}</div>
            <h1 className={styles.title}>{ideia.ida_nome}</h1>
            <div className={styles.authorSection}>
              <div className={styles.authorAvatar}>
                <User size={20} />
              </div>
              <div className={styles.authorText}>
                <span>Idealizador</span>
                <strong>{autor ? `${autor.usu_nome} ${autor.usu_sobrenome}` : 'Carregando...'}</strong>
              </div>
            </div>
          </div>
        </header>

        <section className={styles.descriptionSection}>
          <div className={styles.sectionTitle}>
            <Info size={20} />
            <h2>Sobre o Negócio</h2>
          </div>
          <p className={styles.description}>{ideia.info.ida_info_descricao}</p>
        </section>

        <footer className={styles.actionsArea}>
          <div className={styles.actionCard}>
            <div className={styles.cardHeader}>
              <PlayCircle size={24} />
              <h3>Pitch em Vídeo</h3>
            </div>
            <p>Assista à apresentação detalhada do projeto.</p>
            <button 
              onClick={() => window.open(ideia.info.ida_info_link_video, '_blank')}
              className={styles.buttonPrimary}
            >
              Assistir no YouTube
            </button>
          </div>

          <div className={styles.actionCard}>
            <div className={styles.cardHeader}>
              <MessageSquare size={24} />
              <h3>Negociação</h3>
            </div>
            <p>Ficou interessado? Entre em contato com o autor.</p>
            <button className={styles.buttonSecondary}>
              Enviar Mensagem
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Ideia;