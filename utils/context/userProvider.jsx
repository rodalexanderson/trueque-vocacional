import { createContext, useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../services/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const userContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = doc(db, "users", userAuth.uid);
        const userData = await getDoc(userRef);
        setUser({ ...userData.data(), id: userAuth.uid });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unSubscribe();
  }, []);

  const login = async (email, password) => {
    const data = await signInWithEmailAndPassword(auth, email, password);
    const userRef = doc(db, "users", data?.user?.uid);
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data(); // Obtener más datos del usuario desde Firestore
    return { ...userData, id: data?.user?.uid }; // Incluir más datos del usuario en el objeto user
  };
  
  const signUp = async (values) => {
    await createUserWithEmailAndPassword(auth, values.email, values.password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const userRef = doc(db, "users", user.uid);
        const data = {
          name: values?.name,
          email: values?.email,
          // Otros datos relevantes del usuario
        };
        await setDoc(userRef, data, { merge: true });
        return { ...data, id: user.uid }; // Incluir más datos del usuario en el objeto user
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };
  
  

  return (
    <userContext.Provider value={{ user, login, signUp }}>
      {loading ? <p>Cargando...</p> : children}
    </userContext.Provider>
  );
};

