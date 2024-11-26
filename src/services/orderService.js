import {
    collection, 
    addDoc, 
    getDocs, 
    doc, 
    getDoc, 
    query, 
    where, 
    orderBy 
} from "firebase/firestore";
import { db } from "./firebaseConfig";

// CREATE NEW ORDER
const createOrder = async (order) => {
    try {
        const docRef = await addDoc(collection(db, "Orders"), order);
        console.log("Order created with ID: ", docRef.id);
        return docRef.id;
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

// READ ALL ORDERS
const getOrders = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "Orders"));
        const dataList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        return dataList;
    } catch (error) {
        console.error("Error fetching orders:", error);
        return []; // Retornar un arreglo vacío en caso de error
    }
};

export { getOrders, createOrder };