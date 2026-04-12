import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import de animação
import toast, { Toaster } from 'react-hot-toast'; // Import de popups
import styles from './Login.module.css';
import logo from '../../assets/logo.png';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erros, setErros] = useState({});

  const validar = () => {
    const novosErros = {};
    if (!email.trim()) {
      novosErros.email = 'O campo de email é obrigatório.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      novosErros.email = 'Digite um email válido.';
    }

    if (!senha.trim()) {
      novosErros.senha = 'O campo de senha é obrigatório.';
    } else if (senha.length < 6) {
      novosErros.senha = 'A senha deve ter pelo menos 6 caracteres.';
    }
    return novosErros;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const novosErros = validar();
    setErros(novosErros);

    if (Object.keys(novosErros).length === 0) {
      // Feedback de Sucesso
      toast.success('Bem-vindo de volta!', {
        duration: 4000,
        position: 'top-right',
      });
      
      // Simulando um pequeno delay para o usuário ver o sucesso antes de redirecionar
      setTimeout(() => navigate('/'), 1500);
    } else {
      // Feedback de Erro Geral
      toast.error('Por favor, corrija os erros no formulário.');
    }
  };

  return (
    <div className={styles.page}>
      {/* Componente que renderiza os popups */}
      <Toaster /> 

      <motion.div 
        className={styles.container}
        initial={{ opacity: 0, y: 20 }} // Começa invisível e 20px abaixo
        animate={{ opacity: 1, y: 0 }}    // Anima para visível e posição original
        transition={{ duration: 0.5 }}   // Duração da transição
      >
        <div className={styles.header}>
          <img src={logo} alt="Logo" className={styles.logo} />
          <h2 className={styles.title}>Bem-vindo</h2>
          <p className={styles.subtitle}>Faça login para continuar</p>
        </div>

        <form onSubmit={handleLogin} noValidate>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input
              type="email"
              id="email"
              className={`${styles.input} ${erros.email ? styles.inputError : ''}`}
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {erros.email && <span className={styles.error}>{erros.email}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="senha" className={styles.label}>Senha</label>
            <input
              type="password"
              id="senha"
              className={`${styles.input} ${erros.senha ? styles.inputError : ''}`}
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            {erros.senha && <span className={styles.error}>{erros.senha}</span>}
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }} // Aumenta levemente no hover
            whileTap={{ scale: 0.98 }}   // Diminui levemente no clique
            type="submit" 
            className={styles.button}
          >
            Entrar
          </motion.button>
        </form>

        <div className={styles.linksArea}>
          <Link to="/recup-senha" className={styles.link}>Esqueci minha senha</Link>
          <p className={styles.registerText}>
            Não tem conta? <Link to="/cadastro" className={styles.linkHighlight}>Criar conta</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;