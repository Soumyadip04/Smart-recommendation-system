import React, { useState, useEffect } from 'react';
import { useAdmin } from '@/hooks/useAdmin';
import styles from '@/styles/AdminLogin.module.css';
import { Link } from 'react-router-dom';
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi';

export function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error, quickLogin } = useAdmin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return (
    <div className={`${styles.loginContainer} ${mounted ? styles.fadeIn : ''}`}>
      <div className={styles.loginCard}>
        <h2 className={styles.loginTitle}>Admin Login</h2>
        
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className={styles.formGroup}>
            <label htmlFor="email">
              <FiMail className={styles.inputIcon} /> Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.input}
              placeholder="Enter your email"
              autoComplete="email"
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="password">
              <FiLock className={styles.inputIcon} /> Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.input}
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </div>
          
          {error && <div className={styles.error}>{error}</div>}
          
          <button 
            type="submit" 
            className={styles.loginButton}
            disabled={loading}
          >
            {loading ? (
              'Logging in...'
            ) : (
              <>
                <FiLogIn className={styles.buttonIcon} /> Login
              </>
            )}
          </button>
        </form>
        
        <div className={styles.linkContainer}>
          <p>Don't have an account?</p>
          <Link to="/signup" className={styles.loginLink}>
            Sign Up
          </Link>
        </div>
        
        <div className={styles.demoSection}>
          <p className={styles.demoText}>For demonstration purposes only:</p>
          <button 
            onClick={quickLogin} 
            className={styles.demoButton}
          >
            Quick Login (Demo)
          </button>
        </div>
      </div>
    </div>
  );
}