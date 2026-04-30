import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, MessageSquare, DollarSign, PieChart,
  User, Check, X, Clock, Send, RefreshCcw, Rocket
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import styles from './Propostas.module.css';

function Propostas() {
  const { ideiaId } = useParams();
  const navigate = useNavigate();

  const [ideia, setIdeia]         = useState(null);
  const [propostas, setPropostas] = useState([]);
  const [loading, setLoading]     = useState(true);

  const [showCounterModal, setShowCounterModal] = useState(false);
  const [selectedProposta, setSelectedProposta] = useState(null);
  const [counterSent, setCounterSent]           = useState(false);
  const [sendingAction, setSendingAction]       = useState(false);
  const [counterData, setCounterData]           = useState({ valor: '', fatia: '', mensagem: '' });

  const getToken = () => localStorage.getItem('token');

  useEffect(() => {
    const fetchTudo = async () => {
      const token = getToken();
      if (!token) { setLoading(false); return; }

      try {
        // Busca dados da ideia
        const resIdeia = await fetch(`/api/ideias/${ideiaId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (resIdeia.ok) setIdeia(await resIdeia.json());

        // Busca propostas recebidas: GET /api/propostas/minhas
        const resPropostas = await fetch(`/api/propostas/minhas`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (resPropostas.ok) {
          const todas = await resPropostas.json();
          // Filtra só as propostas desta ideia
          const filtradas = todas.filter(p =>
            String(p.ideiaId ?? p.prpIdeiaId ?? p.ideia_id) === String(ideiaId)
          );
          setPropostas(filtradas);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTudo();
  }, [ideiaId]);

  // Aceitar ou recusar — endpoint: POST /api/propostas/{propostaId}/responder
  const handleAction = async (proposta, action) => {
    if (action === 'counter') {
      setSelectedProposta(proposta);
      const info = proposta.info ?? {};
      setCounterData({
        valor:    info.prpInfoValor    ?? info.valor    ?? '',
        fatia:    info.prpInfoFatiaPret ?? info.fatia   ?? '',
        mensagem: '',
      });
      setShowCounterModal(true);
      return;
    }

    const token  = getToken();
    const prpId  = proposta.prpId ?? proposta.propostaId ?? proposta.id;
    const aceiteId = action === 'accept' ? 1 : 2;

    setSendingAction(true);
    const toastId = toast.loading(aceiteId === 1 ? 'Aceitando proposta...' : 'Recusando proposta...');

    try {
      const response = await fetch(`/api/propostas/${prpId}/responder`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ aceiteId, retorno: null }),
      });

      if (response.ok) {
        toast.success(aceiteId === 1 ? 'Proposta aceita!' : 'Proposta recusada.', { id: toastId });
        setPropostas(prev => prev.map(p =>
          (p.prpId ?? p.propostaId ?? p.id) === prpId
            ? { ...p, statusNome: aceiteId === 1 ? 'Aceita' : 'Recusada' }
            : p
        ));
      } else {
        let msg = 'Erro ao processar.';
        try { const err = await response.json(); msg = err.message || err.title || msg; } catch {}
        toast.error(msg, { id: toastId });
      }
    } catch {
      toast.error('Erro de conexão.', { id: toastId });
    } finally {
      setSendingAction(false);
    }
  };

  // Encerrar proposta — POST /api/propostas/{propostaId}/encerrar
  const handleEncerrar = async (proposta) => {
    const token = getToken();
    const prpId = proposta.propostaId ?? proposta.prpId ?? proposta.id;
    const toastId = toast.loading('Encerrando proposta...');
    try {
      const response = await fetch(`/api/propostas/${prpId}/encerrar`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        toast.success('Proposta encerrada.', { id: toastId });
        setPropostas(prev => prev.map(p =>
          (p.propostaId ?? p.prpId ?? p.id) === prpId ? { ...p, statusNome: 'Encerrada', prpStatusId: 4 } : p
        ));
      } else {
        toast.error('Erro ao encerrar.', { id: toastId });
      }
    } catch {
      toast.error('Erro de conexão.', { id: toastId });
    }
  };

  // Contraproposta (encerra a atual e cria nova via POST /api/ideias/{ideiaId}/propostas)
  const handleCounterSubmit = async (e) => {
    e.preventDefault();
    const token = getToken();
    const prpId = selectedProposta.propostaId ?? selectedProposta.prpId ?? selectedProposta.id;

    setSendingAction(true);
    const toastId = toast.loading('Enviando contraproposta...');

    try {
      // 1. Encerra a proposta original
      await fetch(`/api/propostas/${prpId}/encerrar`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });

      // 2. Cria nova proposta com os termos revisados
      const response = await fetch(`/api/ideias/${ideiaId}/propostas`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          valor:    parseFloat(counterData.valor),
          fatia:    parseFloat(counterData.fatia),
          mensagem: counterData.mensagem,
        }),
      });

      if (response.ok) {
        toast.success('Contraproposta enviada!', { id: toastId });
        setCounterSent(true);
        setTimeout(() => {
          setShowCounterModal(false);
          setCounterSent(false);
          setCounterData({ valor: '', fatia: '', mensagem: '' });
        }, 3000);
      } else {
        let msg = 'Erro ao enviar contraproposta.';
        try { const err = await response.json(); msg = err.message || err.title || msg; } catch {}
        toast.error(msg, { id: toastId });
      }
    } catch {
      toast.error('Erro de conexão.', { id: toastId });
    } finally {
      setSendingAction(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCounterData(prev => ({ ...prev, [name]: value }));
  };

  const getStatusInfo = (proposta) => {
    const statusId   = proposta.prpStatusId ?? proposta.statusId;
    const statusNome = (proposta.statusNome ?? '').toLowerCase();
    if (statusId === 2 || statusNome.includes('aceit')) return { label:'Aceita',    cls: styles.statusAceita,    icon: <Check size={12} /> };
    if (statusId === 3 || statusNome.includes('recus')) return { label:'Recusada',  cls: styles.statusRecusada,  icon: <X size={12} /> };
    if (statusId === 4 || statusNome.includes('encerr')) return { label:'Encerrada', cls: styles.statusRecusada,  icon: <X size={12} /> };
    return { label:'Pendente', cls: styles.statusPendente, icon: <Clock size={12} /> };
  };

  if (loading) return (
    <div className={styles.page}>
      <div className={styles.container} style={{ textAlign:'center', padding:'80px 40px' }}>
        <Rocket size={48} color="#0d47a1" opacity={0.3} />
        <p style={{ marginTop:16, color:'#64748b' }}>Carregando propostas...</p>
      </div>
    </div>
  );

  const nomeIdeia = ideia?.idaNome ?? `Ideia #${ideiaId}`;

  return (
    <div className={styles.page}>
      <Toaster position="top-right" />
      <div className={styles.blob} />

      <div className={styles.container}>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          <ChevronLeft size={16} /> Voltar
        </button>

        <div className={styles.header}>
          <div className={styles.titleArea}>
            <MessageSquare size={32} className={styles.headerIcon} />
            <div>
              <h1 className={styles.title}>Propostas Recebidas</h1>
              <p className={styles.subtitle}>{nomeIdeia}</p>
            </div>
          </div>
          <span className={styles.countBadge}>{propostas.length} proposta{propostas.length !== 1 ? 's' : ''}</span>
        </div>

        {propostas.length === 0 ? (
          <div className={styles.emptyState}>
            <MessageSquare size={48} className={styles.emptyIcon} />
            <p>Nenhuma proposta recebida para esta ideia ainda.</p>
          </div>
        ) : (
          <div className={styles.propostasGrid}>
            {propostas.map((p, i) => {
              const prpId    = p.propostaId ?? p.prpId ?? p.id ?? i;
              const info     = p.info ?? {};
              const valor    = info.prpInfoValor    ?? info.valor    ?? p.valor;
              const fatia    = info.prpInfoFatiaPret ?? info.fatia   ?? p.fatia;
              const mensagem = info.prpInfoMensagem  ?? info.mensagem ?? p.mensagem;
              const invId    = p.prpInvestidorId ?? p.investidorId ?? p.usuarioId;
              const status   = getStatusInfo(p);
              const isPendente = status.label === 'Pendente';

              return (
                <motion.div key={prpId} className={styles.propostaCard} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}>
                  <div className={styles.cardTop}>
                    <div className={styles.investidorInfo}>
                      <div className={styles.avatar}><User size={20} /></div>
                      <div>
                        <span className={styles.investidorLabel}>Investidor</span>
                        <strong className={styles.investidorId}>ID #{invId}</strong>
                      </div>
                    </div>
                    <span className={`${styles.statusBadge} ${status.cls}`}>
                      {status.icon} {status.label}
                    </span>
                  </div>

                  <div className={styles.valoresRow}>
                    <div className={styles.valorBox}>
                      <DollarSign size={16} className={styles.valorIcon} />
                      <div>
                        <span className={styles.valorLabel}>Valor ofertado</span>
                        <strong className={styles.valorNum}>
                          {valor != null ? `R$ ${Number(valor).toLocaleString('pt-BR')}` : '—'}
                        </strong>
                      </div>
                    </div>
                    <div className={styles.valorBox}>
                      <PieChart size={16} className={styles.valorIcon} />
                      <div>
                        <span className={styles.valorLabel}>Fatia pretendida</span>
                        <strong className={styles.valorNum}>{fatia != null ? `${fatia}%` : '—'}</strong>
                      </div>
                    </div>
                  </div>

                  {mensagem && <div className={styles.mensagemBox}><p>{mensagem}</p></div>}

                  {isPendente && (
                    <div className={styles.cardActions}>
                      <button className={styles.btnAceitar}         onClick={() => handleAction(p, 'accept')}  disabled={sendingAction}><Check size={15}/> Aceitar</button>
                      <button className={styles.btnContraproposta}  onClick={() => handleAction(p, 'counter')} disabled={sendingAction}><RefreshCcw size={15}/> Contraproposta</button>
                      <button className={styles.btnRecusar}         onClick={() => handleAction(p, 'reject')}  disabled={sendingAction}><X size={15}/> Recusar</button>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal contraproposta */}
      <AnimatePresence>
        {showCounterModal && (
          <motion.div className={styles.modalOverlay} initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            onClick={(e) => e.target === e.currentTarget && setShowCounterModal(false)}>
            <motion.div className={styles.modalContent} initial={{ scale:0.9, opacity:0 }} animate={{ scale:1, opacity:1 }} exit={{ scale:0.9, opacity:0 }}>
              <button className={styles.closeModal} onClick={() => setShowCounterModal(false)}><X size={18} /></button>

              {counterSent ? (
                <div className={styles.successState}>
                  <Check size={56} color="#10b981" />
                  <h2>Contraproposta Enviada!</h2>
                  <p>Sua nova oferta foi encaminhada ao investidor. Aguarde o retorno.</p>
                </div>
              ) : (
                <>
                  <div className={styles.modalHeader}>
                    <RefreshCcw size={32} color="#0d47a1" />
                    <h2>Contraproposta</h2>
                    <p>Ajuste os termos para o investidor <strong>ID #{selectedProposta?.prpInvestidorId ?? selectedProposta?.investidorId}</strong>.</p>
                  </div>
                  <form className={styles.counterForm} onSubmit={handleCounterSubmit}>
                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label>Novo valor (R$)</label>
                        <input type="number" name="valor" value={counterData.valor} onChange={handleInputChange} required />
                      </div>
                      <div className={styles.formGroup}>
                        <label>Nova fatia (%)</label>
                        <input type="number" name="fatia" value={counterData.fatia} onChange={handleInputChange} required />
                      </div>
                    </div>
                    <div className={styles.formGroup}>
                      <label>Mensagem</label>
                      <textarea name="mensagem" value={counterData.mensagem} onChange={handleInputChange} placeholder="Explique os novos termos..." required />
                    </div>
                    <button type="submit" className={styles.submitBtn} disabled={sendingAction}>
                      <Send size={16}/> {sendingAction ? 'Enviando...' : 'Enviar Contraproposta'}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Propostas;
