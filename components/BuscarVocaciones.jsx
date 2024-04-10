import React, { useState, useEffect } from 'react';
import { getData } from '@/utils/services/crud';
import UserCard from './UserCard';

const BuscarVocaciones = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [vocaciones, setVocaciones] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getData('users');
        setVocaciones(usersData);
      } catch (err) {
        setError('Error al obtener los datos de los usuarios.');
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = vocaciones.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.vocacion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold">Buscar Vocaciones</h2>
      <div className="mt-2">
        <input
          type="text"
          placeholder="Buscar por nombre o vocación"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>
      <div className="mt-4 w-4/5 max-w-xl mx-auto flex flex-wrap">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => <UserCard key={user.id} user={user} />)
        ) : (
          <p>No se encontraron usuarios con los criterios de búsqueda.</p>
        )}
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default BuscarVocaciones;
