"use client"
import React, { useContext, useState, useEffect } from 'react';
import { userContext } from '@/utils/context/userProvider';
import TransferirTalentos from '@/components/transferirTalentos';
import BuscarVocaciones from '@/components/BuscarVocaciones';

const UserMain = () => {
  const { user } = useContext(userContext);
  const [selectedOption, setSelectedOption] = useState('transferir'); // 'transferir' o 'buscar'
  const [talentos, setTalentos] = useState(user ? user.talentos : 0);

  useEffect(() => {
    if (user) {
      setTalentos(user.talentos);
    }
  }, [user]);

  return (
    <div>
      <nav className="mx-12 my-4">
        <p>¡Hola {user.name}!</p>
      </nav>
      <section className="text-center text-lg">
        <p className="font-bold">Estado de Cuenta</p>
        <p>Eres el número de socio {user.clientNumber}</p>
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
      {selectedOption === 'transferir' && <TransferirTalentos userId={user.id} userClientNumber={user.clientNumber} />}
      {selectedOption === 'buscar' && <BuscarVocaciones />}
    </div>
  );
};

export default UserMain;







