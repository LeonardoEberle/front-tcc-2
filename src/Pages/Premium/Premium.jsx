import React, { useState } from 'react';
import { Check, Rocket, Shield, Star, CreditCard } from 'lucide-react';
import { apiRequest } from '../../services/api';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import styles from './Premium.module.css';

function Premium() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const planos = [
    {
      nome: 'Básico',
      preco: 'Grátis',
      descricao: 'Para quem está começando',
      features: ['Até 2 ideias ativas', 'Comentários públicos', 'Chat limitado'],
      color: '#64748b',
      premium: false
    },
    {
      nome: 'Pro',
      preco: 'R$ 49,90',
      descricao: 'Ideal para empreendedores sérios',
      features: ['Ideias ilimitadas', 'Destaque nas buscas', 'Chat prioritário', 'Análise de métricas'],
      color: '#0d47a1',
      premium: true,
      valor: 49.90
    },
    {
      nome: 'Investidor Elite',
      preco: 'R$ 199,90',
      descricao: 'Acesso exclusivo a oportunidades',
      features: ['Filtros avançados', 'Relatórios jurídicos', 'Suporte VIP', 'Selo de investidor verificado'],
      color: '#1e293b',
      premium: true,
      valor: 199.90
    }
  ];

  const handleAssinar = async (plano) => {
    if (!plano.premium) {
      toast.success('Você já possui o plano básico!');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await apiRequest('/api/pagamentos/simular', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          valor: plano.valor,
          descricao: `Assinatura Plano ${plano.nome}`
        })
      });

      if (response.ok) {
        toast.success(`Parabéns! Você agora é ${plano.nome}! (Simulação concluída)`);
        navigate('/perfil');
      } else {
        toast.error('Erro ao processar pagamento simulado.');
      }
    } catch (error) {
      toast.error('Erro de conexão.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Planos e Assinaturas</h1>
        <p>Escolha o melhor plano para acelerar seus negócios no TCC Shark Tank.</p>
      </div>

      <div className={styles.grid}>
        {planos.map((plano, index) => (
          <div key={index} className={`${styles.card} ${plano.nome === 'Pro' ? styles.featured : ''}`}>
            {plano.nome === 'Pro' && <div className={styles.badge}>Mais Popular</div>}
            <div className={styles.cardHeader}>
              <h2 style={{ color: plano.color }}>{plano.nome}</h2>
              <div className={styles.price}>
                <span>{plano.preco}</span>
                {plano.premium && <small>/mês</small>}
              </div>
              <p>{plano.descricao}</p>
            </div>

            <ul className={styles.features}>
              {plano.features.map((f, i) => (
                <li key={i}><Check size={18} color="#22c55e" /> {f}</li>
              ))}
            </ul>

            <button 
              className={plano.premium ? styles.btnPremium : styles.btnFree}
              onClick={() => handleAssinar(plano)}
              disabled={loading}
            >
              {loading ? 'Processando...' : (plano.premium ? 'Assinar Agora' : 'Plano Atual')}
            </button>
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <Shield size={20} />
        <p>Pagamento 100% simulado para fins acadêmicos. Nenhum valor real será cobrado.</p>
      </div>
    </div>
  );
}

export default Premium;
