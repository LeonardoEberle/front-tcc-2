import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Login.module.css';
import logo from '../../assets/logo.png'

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
      navigate('/');
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <img src={logo} alt="Logo da aplicação" className={styles.logo} />

          <h2 className={styles.title}>Bem-vindo</h2>
          <p className={styles.subtitle}>Faça login para continuar</p>
        </div>

        <form onSubmit={handleLogin} noValidate>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`${styles.input} ${erros.email ? styles.inputError : ''}`}
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {erros.email && <span className={styles.error}>{erros.email}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="senha" className={styles.label}>
              Senha
            </label>
            <input
              type="password"
              id="senha"
              name="senha"
              className={`${styles.input} ${erros.senha ? styles.inputError : ''}`}
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
            {erros.senha && <span className={styles.error}>{erros.senha}</span>}
          </div>

          <button type="submit" className={styles.button}>
            Entrar
          </button>
        </form>

        <div className={styles.linksArea}>
          <Link to="/recup-senha" className={styles.link}>
            Esqueci minha senha
          </Link>

          <p className={styles.registerText}>
            Não tem conta?{' '}
            <Link to="/cadastro" className={styles.linkHighlight}>
              Criar conta
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;