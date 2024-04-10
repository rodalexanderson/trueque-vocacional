import React, { useState, useEffect } from "react";
import Link from 'next/link'
import { signUp } from "@/utils/services/authFirebase"; // Importa la función signUp
import { useRouter } from "next/router";
import { getData } from "@/utils/services/crud";

const SignUpForm = () => {
    const [name, setName] = useState("");
    const [vocacion, setVocacion] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(""); 
    const [usersCount, setUsersCount] = useState(0);

    useEffect(() => {
      const fetchUsersCount = async () => {
        try {
          const usersData = await getData("users");
          setUsersCount(usersData.length);
          setLoading(false);
        } catch (error) {
          console.error('Error al obtener usuarios:', error);
        }
      };
      fetchUsersCount();
    }, []);

    
    const clientNumber = usersCount + 1;

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError(null);
      setLoading(true);
    
      try {
        await signUp(name, vocacion, phone, email, password, clientNumber);
        setSuccessMessage("¡Registro exitoso! Redireccionando...");
        setTimeout(() => {
          router.push("/user/main");
        }, 2000); 
      } catch (error) {
        setError(error.message); 
      }
    
      setLoading(false);
    };
    

    const router = useRouter();

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
          {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
          {!successMessage && (
            <>
            <div className="text-right my-6">
              <Link href="/">Regresar a la página principal</Link>
            </div>
              <h2 className="text-2xl font-bold mb-4 text-center">Registrarse a la App de Trueque Vocacional</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">Nombre completo</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 leading-tight border rounded-md focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">Vocación (Ocupación)</label>
                  <input
                    type="text"
                    value={vocacion}
                    onChange={(e) => setVocacion(e.target.value)}
                    className="w-full px-3 py-2 leading-tight border rounded-md focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 font-bold mb-2">Celular</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 leading-tight border rounded-md focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">Correo electrónico:</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 leading-tight border rounded-md focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">Contraseña:</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 leading-tight border rounded-md focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="my-2 text-red-700">
                  <p>Al dar click en el boton "Registrarse", aceptas y reconoces que esto es una prueba de simulacro sin efecto real alguno.</p> <br />
                  <p>Simplemente es para darse una idea de cómo es posible transferir "Puntos" (aquí llamados "Talentos") dentro de la aplicación, actualizando saldos de manera automática, tanto del cliente como del proveedor.</p>
                  <br />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  disabled={loading}
                >
                  {loading ? "Registrando..." : "Registrarse"}
                </button>
              </form>
            </>
          )}
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
      );
}
      

export default SignUpForm;





