import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, MessageSquare, DollarSign, PieChart, User, Check, X, Clock, Send, RefreshCcw } from 'lucide-react';
import mockData from '../../mock_data.json';
import styles from './Propostas.module.css';

function Propostas() {
  const { ideiaId } = useParams();
  const navigate = useNavigate();
  const [ideia, setIdeia] = useState(null);
  const [propostas, setPropostas] = useState([]);
  const [showCounterModal, setShowCounterModal] = useState(false);
  const [selectedProposta, setSelectedProposta] = useState(null);
  const [counterSent, setCounterSent] = useState(false);
  const [counterData, setCounterData] = useState({
    valor: '',
    fatia: '',
    mensagem: ''
  });

  useEffect(() => {
    const foundIdeia = mockData.ideias.find(i => i.ida_id === parseInt(ideiaId));
    if (foundIdeia) {
      setIdeia(foundIdeia);
      const filtradas = mockData.propostas.filter(p => p.prp_ideia_id === foundIdeia.ida_id);
      setPropostas(filtradas);
    }
  }, [ideiaId]);

  const getInvestidorName = (userId) => {
    const user = mockData.usuarios.find(u => u.usu_id === userId);
    return user ? `${user.usu_nome} ${user.usu_sobrenome}` : 'Investidor Desconhecido';
  };

  const handleAction = (prpId, action) => {
    if (action === 'counter') {
      const proposta = propostas.find(p => p.prp_id === prpId);
      setSelectedProposta(proposta);
      setCounterData({
        valor: proposta.info.prp_info_valor,
        fatia: proposta.info.prp_info_fatia_pret,
        mensagem: ''
      });
      setShowCounterModal(true);
    } else {
      alert(`Proposta ${action === 'accept' ? 'aceita' : 'recusada'} com sucesso! (Simulação)`);
    }
  };

  const handleCounterSubmit = (e) => {
    e.preventDefault();
    console.log('Contraproposta enviada:', {
      proposta_original_id: selectedProposta.prp_id,
      ...counterData,
      timestamp: new Date().toISOString()
    });
    setCounterSent(true);
    setTimeout(() => {
      setShowCounterModal(false);
      setCounterSent(false);
      setCounterData({ valor: '', fatia: '', mensagem: '' });
    }, 3000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCounterData(prev => ({ ...prev, [name]: value }));
  };

  if (!ideia) return <div className={styles.page}>Carregando...</div>;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          <ChevronLeft size={20} /> Voltar
        </button>

        <header className={styles.header}>
          <h1 className={styles.title}>Propostas Recebidas</h1>
          <p className={styles.subtitle}>Ideia: <strong>{ideia.ida_nome}</strong></p>
        </header>

        <div className={styles.list}>
          {propostas.length === 0 ? (
            <p className={styles.empty}>Nenhuma proposta recebida para esta ideia ainda.</p>
          ) : (
            propostas.map(p => (
              <div key={p.prp_id} className={styles.card}>
                <div className={styles.cardHeader}>
                  <div className={styles.investorInfo}>
                    <div className={styles.avatar}>
                      <User size={20} />
                    </div>
                    <div>
                      <span className={styles.label}>Investidor</span>
                      <h3 className={styles.investorName}>{getInvestidorName(p.prp_usuario_id)}</h3>
                    </div>
                  </div>
                  <div className={styles.statusBadge}>
                    <Clock size={14} />
                    <span>{p.prp_aceite_nome}</span>
                  </div>
                </div>

                <div className={styles.detailsGrid}>
                  <div className={styles.detailItem}>
                    <DollarSign size={18} />
                    <div>
                      <span>Valor Ofertado</span>
                      <strong>R$ {p.info.prp_info_valor.toLocaleString('pt-BR')}</strong>
                    </div>
                  </div>
                  <div className={styles.detailItem}>
                    <PieChart size={18} />
                    <div>
                      <span>Equity Pretendido</span>
                      <strong>{p.info.prp_info_fatia_pret}%</strong>
                    </div>
                  </div>
                </div>

                <div className={styles.messageBox}>
                  <MessageSquare size={18} />
                  <p>{p.info.prp_info_mensagem}</p>
                </div>

                <div className={styles.actions}>
                  <button className={styles.btnAccept} onClick={() => handleAction(p.prp_id, 'accept')}>
                    <Check size={18} /> Aceitar
                  </button>
                  <button className={styles.btnCounter} onClick={() => handleAction(p.prp_id, 'counter')}>
                    <RefreshCcw size={18} /> Contraproposta
                  </button>
                  <button className={styles.btnDecline} onClick={() => handleAction(p.prp_id, 'decline')}>
                    <X size={18} /> Recusar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <AnimatePresence>
        {showCounterModal && (
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
              <button className={styles.closeModal} onClick={() => setShowCounterModal(false)}>
                <X size={24} />
              </button>

              {!counterSent ? (
                <>
                  <div className={styles.modalHeader}>
                    <RefreshCcw size={32} />
                    <h2>Fazer Contraproposta</h2>
                    <p>Ajuste os termos para o investidor <strong>{getInvestidorName(selectedProposta?.prp_usuario_id)}</strong>.</p>
                  </div>

                  <form className={styles.counterForm} onSubmit={handleCounterSubmit}>
                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label>Novo Valor (R$)</label>
                        <input 
                          type="number" 
                          name="valor"
                          value={counterData.valor}
                          onChange={handleInputChange}
                          required 
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label>Novo Equity (%)</label>
                        <input 
                          type="number" 
                          name="fatia"
                          value={counterData.fatia}
                          onChange={handleInputChange}
                          required 
                        />
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label>Justificativa da Contraproposta</label>
                      <textarea 
                        name="mensagem"
                        placeholder="Explique por que esses valores são mais adequados para o seu negócio..."
                        value={counterData.mensagem}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <button type="submit" className={styles.submitBtn}>
                      <span>Enviar Contraproposta</span>
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
                    <Check size={64} color="#000" />
                  </motion.div>
                  <h2>Contraproposta Enviada!</h2>
                  <p>Sua nova oferta foi encaminhada ao investidor. Aguarde o retorno.</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Propostas;
