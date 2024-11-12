import React, { useState } from 'react';
import { registerUser } from '../services/auth';  // Importa la función registerUser
import loginBg from '../images/login-bg.jpg';  // Fondo de la imagen
import eyeOpen from '../images/eye-open.png';  // Imagen para el ojo abierto
import eyeClosed from '../images/eye-closed.png';  // Imagen para el ojo cerrado

export const RegisterForm = ({ setIsAuthenticated }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar la contraseña
    const [showRegisterForm, setShowRegisterForm] = useState(false); // Estado para controlar la visibilidad del formulario

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Verifica que las contraseñas coincidan
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        const { user, error } = await registerUser(email, password);
        if (user) {
            setIsAuthenticated(true);
        }
        if (error) {
            setError(error);
        }
    };

    return (
        <div
            className="login-container"
            style={{
                backgroundImage: `url(${loginBg})`,  // Fondo con la imagen importada
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
                        src="/images/logo.png" // Asegúrate de que la ruta esté bien
                        alt="Logo de La Casa del Machete"
                        className="logo-image mb-4"
                    />
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        La Casa del Machete
                    </h2>
                </div>
                
                {/* Si showRegisterForm es true, mostramos el formulario de registro */}
                {showRegisterForm ? (
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
                                aria-label="Correo electrónico"
                            />
                        </div>
                        <div className="form-group relative">
                            <input
                                type={showPassword ? 'text' : 'password'}  // Alterna entre "text" y "password"
                                required
                                className="input-field"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                aria-label="Contraseña"
                            />
                            <button
                                type="button"
                                className="absolute right-4 top-2 button-see-password"
                                onClick={() => setShowPassword(prev => !prev)} // Alterna el estado
                                aria-label="Mostrar u ocultar la contraseña"
                            >
                                <img
                                    src={showPassword ? eyeClosed : eyeOpen} // Cambia la imagen según el estado
                                    alt="Mostrar/Ocultar contraseña"
                                />
                            </button>
                        </div>
                        <div className="form-group relative">
                            <input
                                type={showPassword ? 'text' : 'password'}  // Alterna entre "text" y "password"
                                required
                                className="input-field"
                                placeholder="Confirmar Contraseña"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                aria-label="Confirmar contraseña"
                            />
                        </div>

                        <div className="py-6">
                            <button
                                type="submit"
                                className="login-btn"
                            >
                                Registrarse
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="text-center">
                        <p className="text-sm text-gray-600">
                            ¿No tienes cuenta?{' '}
                            <button
                                className="signup-btn"
                                onClick={() => setShowRegisterForm(true)} // Cambiar a true para mostrar el formulario
                            >
                                Regístrate
                            </button>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};