"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getData, updateData } from '@/utils/services/crud';

const TransferirTalentos = ({ userId, userClientNumber, userTalent }) => {
  const router = useRouter();
  const [destinationClient, setDestinationClient] = useState('');
  const [talentAmount, setTalentAmount] = useState('');
  const [clients, setClients] = useState([]);
  const [users, setUsers] = useState([]);

  // Obtener todos los números de proveedoress existentes
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const userData = await getData('users');
        const formattedData = userData.map((user, index) => ({
          id: userData[index].id,
          ...user
        }));
        
        const clientNumbers = formattedData.map(user => user.clientNumber);
        const uniqueClientNumbers = [...new Set(clientNumbers)];
        
        setClients(uniqueClientNumbers.filter(num => num !== userClientNumber));
        setUsers(formattedData);
      } catch (error) {
        console.error('Error al obtener proveedoress:', error);
      }
    };
    fetchClients();
  }, [userClientNumber]);

  const handleTransfer = async () => {
    try {
      // Verificar que el usuario tiene suficientes talentos
      const currentUser = users.find(user => user.id === userId);
      if (currentUser.talentos < Number(talentAmount)) {
        alert('No tienes suficientes talentos para transferir.');
        return;
      }

      // Obtener información del usuario destino
      const selectedUser = users.find(user => user.clientNumber === Number(destinationClient));
      if (!selectedUser) {
        alert('El número de proveedores destino no existe.');
        return;
      }

      // Actualizar talentos del usuario actual
      const newTalentAmountCurrentUser = currentUser.talentos - Number(talentAmount);
      await updateData('users', userId, { talentos: newTalentAmountCurrentUser.toString() });

      // Actualizar talentos del usuario destino
      const newTalentAmountSelectedUser = Number(selectedUser.talentos) + Number(talentAmount);
      await updateData('users', selectedUser.id, { talentos: newTalentAmountSelectedUser.toString() });

      // Redirigir a la página de confirmación
      router.push('/user/main/success');

    } catch (error) {
      console.error('Error al transferir talentos:', error);
      alert(`Error al transferir talentos: ${error.message}`);
    }
  };

  return (
    <div className="mt-8 p-6 bg-white rounded-md shadow-md mx-auto max-w-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Transferir Talentos</h2>
      <div className="mb-4 ">
        <label className="block text-gray-700 font-bold mb-2">Número de proveedores destino:</label>
        <select
          value={destinationClient}
          onChange={(e) => setDestinationClient(e.target.value)}
          className="w-full px-3 py-2 leading-tight border rounded-md focus:outline-none focus:shadow-outline"
        >
          <option value="">Selecciona un proveedores</option>
          {clients.map(client => (
            <option key={client} value={client}>{client}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Cantidad de talentos a transferir:</label>
        <input
          type="number"
          value={talentAmount}
          onChange={(e) => setTalentAmount(e.target.value)}
          className="w-full px-3 py-2 leading-tight border rounded-md focus:outline-none focus:shadow-outline"
          min="0"
        />
      </div>
      <button
        onClick={handleTransfer}
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Transferir
      </button>
    </div>
  );
};

export default TransferirTalentos;





















