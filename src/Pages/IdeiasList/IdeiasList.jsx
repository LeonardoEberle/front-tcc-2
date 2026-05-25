import React, { useState, useEffect } from 'react';
import { Lightbulb, Search, Compass, Rocket, Filter, X } from 'lucide-react';
import IdeiaCard from '../../Components/IdeiaCard/IdeiaCard';
import styles from './IdeiasList.module.css';
import { apiRequest } from '../../services/api';
import { getToken, getRoleFromToken, getPlanFromToken } from '../../utils/auth';

const CATEGORIAS = [
  { id: 1,  nome: 'Tecnologia'       },
  { id: 2,  nome: 'Agro'             },
  { id: 3,  nome: 'Inovação'         },
  { id: 4,  nome: 'Infraestrutura'  },
  { id: 5,  nome: 'Moda'             },
  { id: 6,  nome: 'Automobilismo'    },
  { id: 7,  nome: 'Sustentabilidade'},
  { id: 8,  nome: 'Comodidade'       },
  { id: 9,  nome: 'Lazer'            },
  { id: 10, nome: 'Uso Diário'       },
  { id: 11, nome: 'Moradia'          },
  { id: 12, nome: 'Energia'          },
  { id: 13, nome: 'Marítimo'         },
  { id: 14, nome: 'Aeronáutico'      },
  { id: 15, nome: 'Outros'           },
];

const ESTAGIOS = [
  { id: 1, nome: 'Ideação' },
  { id: 2, nome: 'MVP' },
  { id: 3, nome: 'Tração' },
  { id: 4, nome: 'Scale-up' },
];

function IdeiasList() {
  const [ideias, setIdeias]           = useState([]);
  const [searchTerm, setSearchTerm]   = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [estagioId, setEstagioId]     = useState('');
  const [regiao, setRegiao]           = useState('');
  const [valorMin, setValorMin]       = useState('');
  const [valorMax, setValorMax]       = useState('');
  const [apenasComDocumentos, setApenasComDocumentos] = useState(false);
  const [loading, setLoading]         = useState(true);
  const [erro, setErro]               = useState(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  const token = getToken();
  const role = (getRoleFromToken(token) || '').toLowerCase();
  const plan = (getPlanFromToken(token) || '').toLowerCase();
  const isEliteInvestidor = role === 'investidor' && plan === 'elite';

  // Função original de busca (usada no carregamento inicial e filtros)
  const fetchIdeias = async () => {
    setLoading(true);
    setErro(null);
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('termo', searchTerm);
      if (categoriaId) params.append('categoriaId', categoriaId);
      if (estagioId) params.append('estagioId', estagioId);
      if (regiao) params.append('regiao', regiao);
      if (valorMin) params.append('valorMin', valorMin);
      if (valorMax) params.append('valorMax', valorMax);
      if (apenasComDocumentos && isEliteInvestidor) params.append('apenasComDocumentos', 'true');

      const response = await apiRequest(`/api/ideias?${params.toString()}`, {
        method: 'GET',
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error(`Erro ${response.status}`);
      setIdeias(await response.json());
    } catch (error) {
      console.error('Erro ao buscar ideias:', error);
      setErro(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Função nova de busca por IA (Disparada apenas no clique do botão)
  const handleBuscaIA = async () => {
    if (!searchTerm) return;
    setLoading(true);
    setErro(null);
    try {
      const response = await apiRequest(`/api/ideias/busca-ia?termo=${encodeURIComponent(searchTerm)}`, {
        method: 'GET',
        headers: { Authorization: token ? `Bearer ${token}` : '', 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Erro na busca inteligente');
      setIdeias(await response.json());
    } catch (error) {
      console.error('Erro na busca por IA:', error);
      setErro('Falha na busca inteligente.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIdeias();
  }, [categoriaId, estagioId, regiao, valorMin, valorMax, apenasComDocumentos, isEliteInvestidor, token]);

  const limparFiltros = () => {
    setSearchTerm('');
    setCategoriaId('');
    setEstagioId('');
    setRegiao('');
    setValorMin('');
    setValorMax('');
    setApenasComDocumentos(false);
  };

  const temFiltroAtivo = searchTerm || categoriaId || estagioId || regiao || valorMin || valorMax || apenasComDocumentos;

  return (
    <div className={styles.page}>
      <div className={styles.blob} />
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerTitleArea}>
            <Compass size={36} className={styles.headerIcon} />
            <div>
              <h1 className={styles.title}>Explorar Ideias</h1>
              <p className={styles.subtitle}>Descubra pitches inovadores e conecte-se com empreendedores</p>
            </div>
          </div>
        </div>

        <div className={styles.toolbar}>
          <div className={styles.searchRow}>
            <div className={styles.searchWrapper}>
              <Search size={20} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Buscar por nome ou descrição..."
                className={styles.searchInput}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Botão de busca manual que chama a IA */}
            <button 
              onClick={handleBuscaIA} 
              className={styles.searchButton}
              style={{ marginLeft: '10px', padding: '10px 15px', background: '#0d47a1', color: 'white', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Buscar IA ✨
            </button>

            <select className={styles.select} value={categoriaId} onChange={(e) => setCategoriaId(e.target.value)}>
              <option value="">Todas as Categorias</option>
              {CATEGORIAS.map((cat) => <option key={cat.id} value={cat.id}>{cat.nome}</option>)}
            </select>

            <button className={`${styles.filterButton} ${showAdvanced ? styles.active : ''}`} onClick={() => setShowAdvanced(!showAdvanced)}>
              <Filter size={20} />
            </button>

            {temFiltroAtivo && (
              <button className={styles.clearButton} onClick={limparFiltros} title="Limpar Filtros">
                <X size={20} />
              </button>
            )}
          </div>

          {showAdvanced && (
            <div className={styles.advancedFilters}>
              <div className={styles.filterGroup}>
                <label>Estágio</label>
                <select className={styles.select} value={estagioId} onChange={(e) => setEstagioId(e.target.value)}>
                  <option value="">Todos os Estágios</option>
                  {ESTAGIOS.map((est) => <option key={est.id} value={est.id}>{est.nome}</option>)}
                </select>
              </div>
              <div className={styles.filterGroup}>
                <label>Região</label>
                <input type="text" placeholder="Ex: São Paulo, SP" className={styles.input} value={regiao} onChange={(e) => setRegiao(e.target.value)} />
              </div>
              <div className={styles.filterGroup}>
                <label>Valor Mínimo (R$)</label>
                <input type="number" placeholder="0,00" className={styles.input} value={valorMin} onChange={(e) => setValorMin(e.target.value)} />
              </div>
              <div className={styles.filterGroup}>
                <label>Valor Máximo (R$)</label>
                <input type="number" placeholder="Infinito" className={styles.input} value={valorMax} onChange={(e) => setValorMax(e.target.value)} />
              </div>
              {isEliteInvestidor && (
                <div className={styles.filterGroup}>
                  <label><input type="checkbox" checked={apenasComDocumentos} onChange={(e) => setApenasComDocumentos(e.target.checked)} /> Somente documentos (Elite)</label>
                </div>
              )}
            </div>
          )}
        </div>

        {loading ? (
          <div className={styles.loadingArea}><div className={styles.spinner} /><p>Carregando...</p></div>
        ) : erro ? (
          <div className={styles.errorArea}><p>{erro}</p><button onClick={() => window.location.reload()}>Tentar novamente</button></div>
        ) : ideias.length > 0 ? (
          <div className={styles.grid}>{ideias.map((ideia) => <IdeiaCard key={ideia.idaId} ideia={ideia} />)}</div>
        ) : (
          <div className={styles.emptyState}><h3>Nenhuma ideia encontrada</h3></div>
        )}
      </div>
    </div>
  );
}

export default IdeiasList;