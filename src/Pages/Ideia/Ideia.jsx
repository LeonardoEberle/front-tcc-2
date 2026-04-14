import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, PlayCircle, MessageSquare, Info, User, PieChart, X, CheckCircle, Send } from 'lucide-react';
import mockData from '../../mock_data.json';
import noImage from '../../assets/noimage.jpg';
import styles from './Ideia.module.css';

function Ideia() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ideia, setIdeia] = useState(null);
  const [autor, setAutor] = useState(null);
  const [showProposal, setShowProposal] = useState(false);
  const [proposalSent, setProposalSent] = useState(false);
  const [proposalData, setProposalData] = useState({
    valor: '',
    fatia: '',
    mensagem: ''
  });

  useEffect(() => {
    const foundIdeia = mockData.ideias.find(i => i.ida_id === parseInt(id));
    if (foundIdeia) {
      setIdeia(foundIdeia);
      const foundAutor = mockData.usuarios.find(u => u.usu_id === foundIdeia.ida_usuario_id);
      setAutor(foundAutor);
    }
  }, [id]);

  const handleProposalSubmit = (e) => {
    e.preventDefault();
    console.log('Proposta enviada:', {
      ida_id: ideia.ida_id,
      ...proposalData,
      timestamp: new Date().toISOString()
    });
    setProposalSent(true);
    setTimeout(() => {
      setShowProposal(false);
      setProposalSent(false);
      setProposalData({ valor: '', fatia: '', mensagem: '' });
    }, 3000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProposalData(prev => ({ ...prev, [name]: value }));
  };

  if (!ideia) {
    return (
      <div className={styles.page}>
        <div className={styles.container} style={{ textAlign: 'center' }}>
          <h2 style={{ color: '#000' }}>Ideia não encontrada.</h2>
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
            <p>Ficou interessado? Envie uma proposta de investimento.</p>
            <button 
              className={styles.buttonSecondary}
              onClick={() => setShowProposal(true)}
            >
              Enviar Proposta
            </button>
          </div>
        </footer>
      </div>

      <AnimatePresence>
        {showProposal && (
          <motion.div 
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className={styles.modalContent}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
            >
              <button className={styles.closeModal} onClick={() => setShowProposal(false)}>
                <X size={24} />
              </button>

              {!proposalSent ? (
                <>
                  <div className={styles.modalHeader}>
                    <MessageSquare size={32} />
                    <h2>Enviar Proposta</h2>
                    <p>Defina os termos do seu investimento para <strong>{ideia.ida_nome}</strong>.</p>
                  </div>

                  <form className={styles.proposalForm} onSubmit={handleProposalSubmit}>
                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label>Valor do Investimento (R$)</label>
                        <input 
                          type="number" 
                          name="valor"
                          placeholder="Ex: 50000"
                          value={proposalData.valor}
                          onChange={handleInputChange}
                          required 
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label>Equity Pretendido (%)</label>
                        <input 
                          type="number" 
                          name="fatia"
                          placeholder="Ex: 10"
                          value={proposalData.fatia}
                          onChange={handleInputChange}
                          required 
                        />
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label>Sua Mensagem / Pitch do Investidor</label>
                      <textarea 
                        name="mensagem"
                        placeholder="Conte por que você é o parceiro ideal para este negócio..."
                        value={proposalData.mensagem}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <button type="submit" className={styles.submitBtn}>
                      <span>Enviar Proposta</span>
                      <Send size={18} />
                    </button>
                  </form>
                </>
              ) : (
                <div className={styles.successState}>
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 12 }}
                  >
                    <CheckCircle size={64} color="#000" />
                  </motion.div>
                  <h2>Proposta Enviada!</h2>
                  <p>Sua oferta foi encaminhada ao empreendedor. Você será notificado sobre o aceite ou contraproposta.</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Ideia;