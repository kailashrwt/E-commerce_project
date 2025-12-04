import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setMessage('');
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long');
            setLoading(false);
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(
                `http://localhost:6060/api/auth/reset-password/${token}`,
                { password: formData.password, confirmPassword: formData.confirmPassword }
            );

            if (response.data.success) {
                setMessage('Password reset successfully! Redirecting to login...');
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            }
        } catch (error) {
            setError(
                error.response?.data?.message || 
                'Failed to reset password. The link may have expired.'
            );
        } finally {
            setLoading(false);
        }
    };

    // Inline styles with dark background
    const styles = {
        container: {
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#0F172A', // Dark background color
            padding: '20px'
        },
        card: {
            background: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
            padding: '40px',
            borderRadius: '15px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
            width: '100%',
            maxWidth: '450px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
        },
        header: {
            textAlign: 'center',
            marginBottom: '30px'
        },
        title: {
            color: '#D4AF37',
            marginBottom: '10px',
            fontSize: '28px'
        },
        subtitle: {
            color: '#F8FAFC',
            marginBottom: '10px',
            fontSize: '22px'
        },
        description: {
            color: '#CBD5E1',
            fontSize: '14px'
        },
        formGroup: {
            marginBottom: '20px'
        },
        label: {
            display: 'block',
            marginBottom: '8px',
            color: '#F8FAFC',
            fontWeight: '500'
        },
        input: {
            width: '100%',
            padding: '12px 15px',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '8px',
            fontSize: '16px',
            transition: 'border-color 0.3s ease',
            boxSizing: 'border-box',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            color: '#F8FAFC'
        },
        inputFocus: {
            outline: 'none',
            borderColor: '#D4AF37'
        },
        small: {
            color: '#94A3B8',
            fontSize: '12px',
            marginTop: '5px',
            display: 'block'
        },
        alert: {
            padding: '12px 15px',
            borderRadius: '8px',
            marginBottom: '20px',
            textAlign: 'center'
        },
        alertSuccess: {
            backgroundColor: 'rgba(34, 197, 94, 0.2)',
            color: '#BBF7D0',
            border: '1px solid rgba(34, 197, 94, 0.3)'
        },
        alertError: {
            backgroundColor: 'rgba(239, 68, 68, 0.2)',
            color: '#FECACA',
            border: '1px solid rgba(239, 68, 68, 0.3)'
        },
        button: {
            width: '100%',
            padding: '12px',
            background: 'linear-gradient(135deg, #D4AF37 0%, #F4D03F 100%)',
            color: '#0F172A',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
        },
        buttonDisabled: {
            opacity: '0.6',
            cursor: 'not-allowed'
        },
        footer: {
            textAlign: 'center',
            paddingTop: '20px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)'
        },
        footerText: {
            color: '#94A3B8',
            margin: '0'
        },
        link: {
            color: '#D4AF37',
            textDecoration: 'none',
            fontWeight: '500'
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.header}>
                    <h2 style={styles.title}>💎 Lara Jewellery</h2>
                    <h3 style={styles.subtitle}>Reset Your Password</h3>
                    <p style={styles.description}>Enter your new password below</p>
                </div>

                {message && (
                    <div style={{...styles.alert, ...styles.alertSuccess}}>
                        {message}
                    </div>
                )}

                {error && (
                    <div style={{...styles.alert, ...styles.alertError}}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
                    <div style={styles.formGroup}>
                        <label htmlFor="password" style={styles.label}>
                            New Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your new password"
                            required
                            minLength="6"
                            style={styles.input}
                            onFocus={(e) => e.target.style.borderColor = '#D4AF37'}
                            onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'}
                        />
                        <small style={styles.small}>
                            Password must be at least 6 characters long
                        </small>
                    </div>

                    <div style={styles.formGroup}>
                        <label htmlFor="confirmPassword" style={styles.label}>
                            Re-enter New Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Re-enter your new password"
                            required
                            minLength="6"
                            style={styles.input}
                            onFocus={(e) => e.target.style.borderColor = '#D4AF37'}
                            onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'}
                        />
                    </div>

                    <button 
                        type="submit" 
                        style={{
                            ...styles.button,
                            ...(loading ? styles.buttonDisabled : {})
                        }}
                        disabled={loading}
                        onMouseOver={(e) => !loading && (e.target.style.transform = 'translateY(-2px)')}
                        onMouseOut={(e) => !loading && (e.target.style.transform = 'translateY(0)')}
                    >
                        {loading ? 'Resetting Password...' : 'Reset Password'}
                    </button>
                </form>

                <div style={styles.footer}>
                    <p style={styles.footerText}>
                        Remember your password?{' '}
                        <a href="/login" style={styles.link}>Back to Login</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;