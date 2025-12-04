import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgetPassword = ({ theme }) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    // Theme-based color palette (same as login)
    const themeColors = {
        light: {
            background: "#F8FAFC",
            text: "#0F172A",
            cardBackground: "#FFFFFF",
            border: "rgba(15, 23, 42, 0.1)",
            inputBackground: "rgba(255, 255, 255, 0.9)",
        },
        dark: {
            background: "#0F172A",
            text: "#F8FAFC",
            cardBackground: "#1E293B",
            border: "rgba(248, 250, 252, 0.1)",
            inputBackground: "rgba(30, 41, 59, 0.8)",
        }
    };

    // Vibrant gradients (same as login)
    const colors = {
        gradient: {
            primary: "linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)",
            secondary: "linear-gradient(135deg, #4ECDC4 0%, #6EFAF4 100%)",
            accent: "linear-gradient(135deg, #FFD166 0%, #FFE08E 100%)",
            purple: "linear-gradient(135deg, #A78BFA 0%, #C4B5FD 100%)",
            pink: "linear-gradient(135deg, #FF85A1 0%, #FFB6C1 100%)",
            rainbow: "linear-gradient(135deg, #FF6B6B, #FFD166, #06D6A0, #6D9EEB, #A78BFA)",
        }
    };

    const currentTheme = themeColors[theme] || themeColors.light;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address');
            setLoading(false);
            return;
        }

        try {
            console.log('Sending password reset request for:', email);
            
            const response = await fetch('http://localhost:6060/api/auth/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            console.log('Response status:', response.status);
            
            const data = await response.json();
            console.log('Response data:', data);

            if (data.success) {
                setMessage(data.message || 'If the email exists, a password reset link has been sent to your email.');
                setEmail('');
            } else {
                setError(data.message || 'Failed to send reset email. Please try again.');
            }
        } catch (error) {
            console.error('Forgot password error:', error);
            setError('Network error. Please check if the server is running and try again.');
        } finally {
            setLoading(false);
        }
    };

    const styles = {
        container: {
            minHeight: '100vh',
            background: theme === 'dark'
                ? 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)'
                : 'linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            paddingTop: '6rem',
        },
        card: {
            background: currentTheme.cardBackground,
            padding: '3rem',
            borderRadius: '20px',
            boxShadow: theme === 'dark'
                ? '0 20px 40px rgba(0,0,0,0.3), 0 8px 24px rgba(0,0,0,0.2)'
                : '0 20px 40px rgba(255,107,107,0.1), 0 8px 24px rgba(0,0,0,0.05)',
            border: `1px solid ${currentTheme.border}`,
            backdropFilter: 'blur(10px)',
            maxWidth: '450px',
            width: '100%',
            textAlign: 'center',
        },
        title: {
            fontSize: '2.5rem',
            fontWeight: '900',
            background: colors.gradient.rainbow,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '0.5rem',
            fontFamily: "'Poppins', sans-serif",
        },
        subtitle: {
            color: currentTheme.text,
            opacity: 0.8,
            marginBottom: '2rem',
            fontSize: '1rem',
            fontFamily: "'Inter', sans-serif",
            lineHeight: '1.5',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            marginBottom: '2rem',
        },
        inputGroup: {
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            textAlign: 'left',
        },
        label: {
            color: currentTheme.text,
            fontWeight: '600',
            fontSize: '0.9rem',
            fontFamily: "'Inter', sans-serif",
        },
        input: {
            padding: '1rem 1.2rem',
            border: `1px solid ${currentTheme.border}`,
            borderRadius: '12px',
            background: currentTheme.inputBackground,
            fontSize: '0.9rem',
            outline: 'none',
            transition: 'all 0.3s ease',
            color: currentTheme.text,
            fontFamily: "'Inter', sans-serif",
            width: '100%',
            boxSizing: 'border-box',
        },
        inputFocus: {
            border: `1px solid #A78BFA`,
            boxShadow: `0 0 0 3px rgba(167, 139, 250, 0.2)`,
            transform: 'translateY(-2px)',
        },
        submitButton: {
            background: colors.gradient.purple,
            color: 'white',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '25px',
            fontSize: '1rem',
            fontWeight: '700',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontFamily: "'Inter', sans-serif",
            marginTop: '1rem',
            boxShadow: '0 4px 15px rgba(167, 139, 250, 0.3)',
            position: 'relative',
            overflow: 'hidden',
        },
        submitButtonHover: {
            transform: 'translateY(-3px)',
            boxShadow: '0 8px 25px rgba(167, 139, 250, 0.4)',
        },
        loadingSpinner: {
            display: 'inline-block',
            width: '16px',
            height: '16px',
            border: '2px solid rgba(255,255,255,0.3)',
            borderRadius: '50%',
            borderTopColor: '#fff',
            animation: 'spin 1s ease-in-out infinite',
            marginRight: '8px',
        },
        message: {
            color: '#06D6A0',
            backgroundColor: 'rgba(6, 214, 160, 0.1)',
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            fontSize: '0.9rem',
            marginBottom: '1rem',
            border: '1px solid rgba(6, 214, 160, 0.2)',
            textAlign: 'left',
        },
        error: {
            color: '#FF6B6B',
            backgroundColor: 'rgba(255, 107, 107, 0.1)',
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            fontSize: '0.9rem',
            marginBottom: '1rem',
            border: '1px solid rgba(255, 107, 107, 0.2)',
            textAlign: 'left',
        },
        backSection: {
            marginTop: '2rem',
            paddingTop: '2rem',
            borderTop: `1px solid ${currentTheme.border}`,
            color: currentTheme.text,
            opacity: 0.8,
            fontSize: '0.9rem',
            fontFamily: "'Inter', sans-serif",
        },
        backLink: {
            color: '#FF6B6B',
            textDecoration: 'none',
            fontWeight: '700',
            marginLeft: '0.5rem',
            transition: 'all 0.3s ease',
            fontFamily: "'Inter', sans-serif",
        },
        linkHover: {
            transform: 'translateX(3px)',
        },
    };

    return (
        <div style={styles.container}>
            <style>
                {`
                    @keyframes spin {
                        to { transform: rotate(360deg); }
                    }
                `}
            </style>
            
            <div style={styles.card}>
                <h1 style={styles.title}>🔐 Reset Password</h1>
                <p style={styles.subtitle}>
                    Enter your email address and we'll send you a link to reset your password
                </p>

                {/* Success Message */}
                {message && (
                    <div style={styles.message}>
                        ✅ {message}
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div style={styles.error}>
                        ❌ {error}
                    </div>
                )}

                <form style={styles.form} onSubmit={handleSubmit}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Email Address</label>
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{
                                ...styles.input,
                                background: loading ? 
                                    (theme === 'dark' ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.5)') 
                                    : currentTheme.inputBackground
                            }}
                            onFocus={(e) => {
                                e.target.style.border = '1px solid #A78BFA';
                                e.target.style.boxShadow = '0 0 0 3px rgba(167, 139, 250, 0.2)';
                                e.target.style.transform = 'translateY(-2px)';
                            }}
                            onBlur={(e) => {
                                e.target.style.border = `1px solid ${currentTheme.border}`;
                                e.target.style.boxShadow = 'none';
                                e.target.style.transform = 'translateY(0)';
                            }}
                            disabled={loading}
                        />
                    </div>

                    <button
                        type="submit"
                        style={{
                            ...styles.submitButton,
                            ...(loading && { 
                                background: '#ccc',
                                cursor: 'not-allowed',
                                opacity: 0.7 
                            })
                        }}
                        onMouseEnter={(e) => {
                            if (!loading) {
                                e.target.style.transform = 'translateY(-3px)';
                                e.target.style.boxShadow = '0 8px 25px rgba(167, 139, 250, 0.4)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 4px 15px rgba(167, 139, 250, 0.3)';
                        }}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <span style={styles.loadingSpinner}></span>
                                SENDING...
                            </>
                        ) : (
                            '📧 SEND RESET LINK'
                        )}
                    </button>
                </form>

                <div style={styles.backSection}>
                    <span>Remember your password?</span>
                    <Link
                        to="/login"
                        style={styles.backLink}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'translateX(3px)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'translateX(0)';
                        }}
                    >
                        Back to login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgetPassword;