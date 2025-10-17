import React, { useState, useEffect } from 'react';
import { useAdmin } from '@/hooks/useAdmin';
import styles from '@/styles/AdminLogin.module.css';
import { Link } from 'react-router-dom';
import { FiMail, FiLock, FiUserPlus, FiCheckCircle, FiRefreshCw } from 'react-icons/fi';

export function AdminSignup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [signupData, setSignupData] = useState(null);
  const [resendMessage, setResendMessage] = useState('');
  const { signup, resendConfirmation, loading, error } = useAdmin();

  const validatePassword = () => {
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      return false;
    }
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validatePassword()) return;
    
    const result = await signup(email, password);
    if (result.success) {
      setSignupSuccess(true);
      setSignupData(result);
    }
  };

  const handleResendConfirmation = async () => {
    const result = await resendConfirmation(email);
    if (result.success) {
      setResendMessage(result.message);
      setTimeout(() => setResendMessage(''), 5000);
    }
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (signupSuccess) {
    return (
      <div className={`${styles.loginContainer} ${mounted ? styles.fadeIn : ''}`}>
        <div className={styles.loginCard}>
          <h2 className={styles.loginTitle}>
            <FiCheckCircle className={styles.successIcon} /> Signup Successful
          </h2>
          <p className={styles.successMessage}>
            {signupData?.needsEmailConfirmation ? (
              <>
                Your account has been created successfully! <br/>
                <strong>Please check your email and click the confirmation link to complete your registration.</strong>
                <br/><br/>
                Don't forget to check your spam folder if you don't see the email.
              </>
            ) : (
              'Your account has been created and is ready to use!'
            )}
          </p>
          
          {signupData?.needsEmailConfirmation && (
            <div className={styles.resendSection}>
              <button 
                onClick={handleResendConfirmation}
                className={`${styles.loginButton} ${styles.resendButton}`}
                disabled={loading}
              >
                {loading ? 'Sending...' : (
                  <>
                    <FiRefreshCw className={styles.buttonIcon} /> Resend Confirmation Email
                  </>
                )}
              </button>
              {resendMessage && (
                <p className={styles.resendMessage}>{resendMessage}</p>
              )}
            </div>
          )}
          
          <Link to="/admin" className={`${styles.loginLink} ${styles.successLink}`}>
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.loginContainer} ${mounted ? styles.fadeIn : ''}`}>
      <div className={styles.loginCard}>
        <h2 className={styles.loginTitle}>Admin Signup</h2>
        
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
              autoComplete="new-password"
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">
              <FiLock className={styles.inputIcon} /> Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className={styles.input}
              placeholder="Confirm your password"
              autoComplete="new-password"
            />
          </div>
          
          {passwordError && <div className={styles.error}>{passwordError}</div>}
          {error && <div className={styles.error}>{error}</div>}
          
          <button 
            type="submit" 
            className={styles.loginButton}
            disabled={loading}
          >
            {loading ? 'Signing up...' : (
              <>
                <FiUserPlus className={styles.buttonIcon} /> Sign Up
              </>
            )}
          </button>
        </form>
        
        <div className={styles.linkContainer}>
          <p>Already have an account?</p>
          <Link to="/admin" className={styles.loginLink}>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}