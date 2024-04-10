import { auth, db } from "./firebase";
import {
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getDocs, doc, setDoc, collection, query, where } from "firebase/firestore";
import { updateData } from "./crud";

export const addUser = async (user) => {
  const { uid, displayName, email, photoURL } = user;
  const docRef = doc(db, "users", uid);
  const userExist = await getDataById("users", uid);

  if (!userExist) {
    await setDoc(docRef, {
      email: email,
      name: displayName,
      photo: photoURL,
      uid,
    });
  }
};

export const userExist = async (email) => {
  const ref = collection(db, "users");
  const q = query(ref, where("email", "==", email));
  const res = await getDocs(q);
  if (res.empty) {
    return { userExists: false };
  } else {
    return {
      userExists: true,
      data: { ...res.docs[0]?.data(), id: res.docs[0]?.id },
    };
  }
};

export const signUp = async (name, vocacion, phone, email, password, clientNumber) => {

  // Validar el formato del correo electrónico
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    throw new Error('Correo electrónico inválido');
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userRef = doc(db, "users", user.uid);
    const userData = {
      email: email,
      name: name,
      phone: phone,
      vocacion: vocacion,
      talentos: 50,
      clientNumber: clientNumber,
    };
    await setDoc(userRef, userData);
    
    return user;
  } catch (error) {
    console.error("Error en signUp:", error);
    throw error;
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

export const handleAuthChange = (callback) => {
  const unsubscribe = onAuthStateChanged(auth, callback);
  return () => unsubscribe();
};




