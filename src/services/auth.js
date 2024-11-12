// auth.js

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

const auth = getAuth();

// Registro de un nuevo usuario
const registerUser = async (email, password, name) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("Usuario registrado: ", user.uid);

        // Guardar detalles adicionales del usuario en Firestore
        await setDoc(doc(db, "Users", user.uid), {
            name,
            role: 'cliente', // Asignando un rol por defecto
            createdAt: new Date(), // Fecha de creación
        });

        return { user, error: null };
    } catch (error) {
        console.error("Error registrando usuario: ", error.message);
        return { user: null, error: error.message };
    }
}

// Iniciar sesión de un usuario
const loginUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("Usuario logueado: ", user.uid);

        // Verificar si el usuario tiene datos en Firestore
        const userDocRef = doc(db, "Users", user.uid);
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
            // Obtener el nombre del usuario de Firestore
            const userName = userDoc.data().name;
            console.log("Nombre del usuario: ", userName);

            // Guardar el nombre y el ID del usuario en localStorage
            localStorage.setItem('userName', userName);
            localStorage.setItem('userId', user.uid);
            console.log("Nombre guardado en localStorage:", localStorage.getItem('userName'));

            return { user: { ...user, name: userName }, error: null };
        } else {
            console.log("El usuario no tiene datos adicionales en Firestore.");
            return { user: null, error: "Usuario no encontrado en la base de datos." };
        }
    } catch (error) {
        console.error("Error al iniciar sesión: ", error.message);
        return { user: null, error: error.message };
    }
}

// Cerrar sesión de un usuario
const logoutUser = async () => {
    try {
        await signOut(auth);
        console.log("Usuario desconectado");

        // Limpiar datos del localStorage
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userName');
        localStorage.removeItem('userId');

        return { user: null, error: null };
    } catch (error) {
        console.error("Error al cerrar sesión: ", error.message);
        return { error: error.message };
    }
}

export { registerUser, loginUser, logoutUser };