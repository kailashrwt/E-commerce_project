import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Register({ theme }) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

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

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        if (error) setError('');
    };

    // REPLACE YOUR handleSubmit FUNCTION WITH THIS:
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        console.log('Form data being sent:', formData);

        try {
            const response = await fetch('http://localhost:6060/api/client/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            
            const data = await response.json();

            if (response.ok) {
                console.log('Registration successful:', data);
                alert('Registration successful! You can now login.');
                navigate('/login');
            } else {
                setError(data.message || 'Registration failed');
            }
        } catch (error) {
            console.error('Registration error:', error);
            setError('Network error. Please try again.');
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
            paddingTop: '6rem', // Account for fixed navbar
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
            maxWidth: '500px',
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
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
        },
        inputRow: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem',
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
            border: `1px solid ${colors.gradient.secondary.split(' ')[2]}`,
            boxShadow: `0 0 0 3px ${colors.gradient.secondary.split(' ')[2]}20`,
            transform: 'translateY(-2px)',
        },
        createButton: {
            background: loading ? '#ccc' : colors.gradient.secondary,
            color: 'white',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '25px',
            fontSize: '1rem',
            fontWeight: '700',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
            fontFamily: "'Inter', sans-serif",
            marginTop: '1rem',
            boxShadow: loading ? 'none' : '0 4px 15px rgba(78, 205, 196, 0.3)',
            opacity: loading ? 0.7 : 1,
        },
        createButtonHover: {
            transform: 'translateY(-3px)',
            boxShadow: '0 8px 25px rgba(78, 205, 196, 0.4)',
        },
        errorMessage: {
            color: '#FF6B6B',
            backgroundColor: 'rgba(255, 107, 107, 0.1)',
            padding: '0.75rem',
            borderRadius: '8px',
            fontSize: '0.9rem',
            marginBottom: '1rem',
            border: '1px solid rgba(255, 107, 107, 0.2)',
        },
        loginSection: {
            marginTop: '2rem',
            paddingTop: '2rem',
            borderTop: `1px solid ${currentTheme.border}`,
            color: currentTheme.text,
            opacity: 0.8,
            fontSize: '0.9rem',
        },
        loginLink: {
            color: colors.gradient.primary.split(' ')[2],
            textDecoration: 'none',
            fontWeight: '700',
            marginLeft: '0.5rem',
            transition: 'all 0.3s ease',
        },
        linkHover: {
            transform: 'translateX(3px)',
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.title}>🎉 Join Us!</h1>
                <p style={styles.subtitle}>Create your account to get started</p>

                {/* Add error message display */}
                {error && (
                    <div style={styles.errorMessage}>
                        {error}
                    </div>
                )}

                <form style={styles.form} onSubmit={handleSubmit}>
                    <div style={styles.inputRow}>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                                style={styles.input}
                                onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                                onBlur={(e) => {
                                    e.target.style.border = `1px solid ${currentTheme.border}`;
                                    e.target.style.boxShadow = 'none';
                                    e.target.style.transform = 'translateY(0)';
                                }}
                                disabled={loading}
                            />
                        </div>

                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                                style={styles.input}
                                onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                                onBlur={(e) => {
                                    e.target.style.border = `1px solid ${currentTheme.border}`;
                                    e.target.style.boxShadow = 'none';
                                    e.target.style.transform = 'translateY(0)';
                                }}
                                disabled={loading}
                            />
                        </div>
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            style={styles.input}
                            onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                            onBlur={(e) => {
                                e.target.style.border = `1px solid ${currentTheme.border}`;
                                e.target.style.boxShadow = 'none';
                                e.target.style.transform = 'translateY(0)';
                            }}
                            disabled={loading}
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Create a password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            style={styles.input}
                            onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                            onBlur={(e) => {
                                e.target.style.border = `1px solid ${currentTheme.border}`;
                                e.target.style.boxShadow = 'none';
                                e.target.style.transform = 'translateY(0)';
                            }}
                            disabled={loading}
                            minLength="6"
                        />
                    </div>

                    <button
                        type="submit"
                        style={styles.createButton}
                        onMouseEnter={(e) => {
                            if (!loading) {
                                Object.assign(e.target.style, styles.createButtonHover);
                            }
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = loading ? 'translateY(0)' : 'translateY(0)';
                            e.target.style.boxShadow = loading ? 'none' : '0 4px 15px rgba(78, 205, 196, 0.3)';
                        }}
                        disabled={loading}
                    >
                        {loading ? '⏳ CREATING ACCOUNT...' : '✨ CREATE ACCOUNT'}
                    </button>
                </form>

                <div style={styles.loginSection}>
                    <span>ALREADY A MEMBER?</span>
                    <Link
                        to="/login"
                        style={styles.loginLink}
                        onMouseEnter={(e) => {
                            Object.assign(e.target.style, styles.linkHover);
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'translateX(0)';
                        }}
                    >
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
}