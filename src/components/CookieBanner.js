import React, { useState, useEffect } from 'react';

const CookieBanner = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Verificăm dacă utilizatorul a acceptat deja cookie-urile
        const consent = localStorage.getItem('gdpr_cookie_consent');
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('gdpr_cookie_consent', 'true');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div style={styles.banner}>
            <div style={styles.content}>
                <p style={styles.text}>
                    🍪 Acest site folosește cookie-uri proprii și de la terți (inclusiv rețele de afiliere)
                    pentru a-ți oferi o experiență optimă de navigare, a analiza traficul și a direcționa corect ofertele partenerilor.
                    Prin continuarea navigării, îți exprimi acordul cu privire la utilizarea acestora.
                </p>
                <div style={styles.buttons}>
                    <button onClick={handleAccept} style={styles.acceptBtn}>
                        Am înțeles și accept
                    </button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    banner: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#1e293b',
        color: '#ffffff',
        padding: '16px 24px',
        boxShadow: '0 -4px 10px rgba(0,0,0,0.15)',
        zIndex: 9999,
    },
    content: {
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        alignItems: 'center',
    },
    text: {
        margin: 0,
        fontSize: '0.9rem',
        lineHeight: '1.4',
        textAlign: 'center',
    },
    acceptBtn: {
        backgroundColor: '#22c55e',
        color: '#fff',
        border: 'none',
        padding: '8px 20px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: 'bold',
    }
};

export default CookieBanner;