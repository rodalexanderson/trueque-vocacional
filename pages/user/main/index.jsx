"use client"
import React, { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { userContext } from '@/utils/context/userProvider';
import TransferirTalentos from '@/components/TransferirTalentos';
import BuscarVocaciones from '@/components/BuscarVocaciones';
import { signOutUser } from '@/utils/services/authFirebase';
import { getData } from '@/utils/services/crud';

const UserMain = () => {
  const { user } = useContext(userContext);
  const [selectedOption, setSelectedOption] = useState('transferir'); // 'transferir' o 'buscar'
  const [talentos, setTalentos] = useState(user ? user.talentos : 0);
  const [userName, setUserName] = useState(user ? user.name : '');
  const router = useRouter();

  useEffect(() => {
    if (user) {
      setTalentos(user.talentos);
      setUserName(user.name);
    }
  }, [user]);

  useEffect(() => {
    const fetchUserTalentos = async () => {
      try {
        const userData = await getData('users');
        const matchedUser = userData.find(u => u.id === user.id);  // Encuentra el usuario con el mismo ID
        if (matchedUser) {
          setTalentos(matchedUser.talentos);  // Actualiza los talentos del usuario
        }
      } catch (error) {
        console.error('Error al obtener los talentos del usuario:', error);
      }
    };

    if (user) {
      fetchUserTalentos();
    }
  }, []);

  const LogOut = () => {
    signOutUser();
    router.push("/");
  }
  console.log(talentos)

  return (
    <div>
      <nav className="px-24 my-4 flex flex-row justify-end">
        <p>¡Hola {userName}!</p>
        <button className='mx-12 hover:font-bold' onClick={LogOut}>Salir</button>
      </nav>
      <section className="text-center text-lg">
        <p className="font-bold">Estado de Cuenta</p>
        <p>Eres el número de socio {user ? user.clientNumber : ''}</p>
        <p>Tienes {talentos} talentos disponibles</p>
      </section>

      {/* Botones para seleccionar opción */}
      <div className="flex justify-center mt-4 space-x-4">
        <button
          className={`py-2 px-4 rounded ${
            selectedOption === 'transferir' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setSelectedOption('transferir')}
        >
          Transferir Talentos
        </button>
        <button
          className={`py-2 px-4 rounded ${
            selectedOption === 'buscar' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setSelectedOption('buscar')}
        >
          Buscar Vocaciones
        </button>
      </div>

      {/* Mostrar componente seleccionado */}
      {selectedOption === 'transferir' && <TransferirTalentos userId={user ? user.id : ''} userClientNumber={user ? user.clientNumber : ''} />}
      {selectedOption === 'buscar' && <BuscarVocaciones />}
    </div>
  );
};

export default UserMain;







