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
            console.log("Datos del usuario: ", userDoc.data());
        } else {
            console.log("El usuario no tiene datos adicionales en Firestore.");
        }

        return { user, error: null };
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
        return { user: null, error: null };
    } catch (error) {
        console.error("Error al cerrar sesión: ", error.message);
        return { error: error.message };
    }
}

export { registerUser, loginUser, logoutUser };