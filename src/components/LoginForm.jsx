import React, { useState } from 'react';
import { loginUser } from '../services/auth';
import loginBg from '../images/login-bg.jpg';
import eyeOpen from '../images/eye-open.png';
import eyeClosed from '../images/eye-closed.png';
import { useNavigate } from 'react-router-dom';  // Importar useNavigate

export const LoginForm = ({ isAuthenticated, setIsAuthenticated }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();  // Inicializa el hook de navegación

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { user, error } = await loginUser(email, password);
        if (user) {
            setIsAuthenticated(true);
            localStorage.setItem('isAuthenticated', 'true');  // Guarda el estado en el localStorage
            navigate('/dashboard');  // Redirige al usuario a /dashboard después de iniciar sesión
        }
        if (error) {
            setError(error);
        }
    };

    return (
        <div
            className="login-container"
            style={{
                backgroundImage: `url(${loginBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <div className="login-form bg-white p-8 rounded-lg shadow-lg">
                <div className="text-center">
                    <img
                        src="src/images/logo.png"
                        alt="Logo"
                        className="logo-image mb-4"
                    />
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        La Casa del Machete
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="error-message bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                            <strong className="font-bold">Error:</strong>
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}
                    <div className="form-group">
                        <input
                            type="email"
                            required
                            className="input-field"
                            placeholder="Correo"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            required
                            className="input-field"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            className="absolute right-4 top-2 button-see-password"
                            onClick={() => setShowPassword(prev => !prev)}
                        >
                            <img
                                src={showPassword ? eyeClosed : eyeOpen}
                                alt="Mostrar/Ocultar contraseña"
                            />
                        </button>
                    </div>

                    <div className="py-6">
                        <button
                            type="submit"
                            className="login-btn"
                        >
                            Iniciar sesión
                        </button>
                    </div>
                </form>
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        ¿No tienes cuenta?{' '}
                        <a href="/signup" className="signup-link">
                            Regístrate
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};