import React from "react";

const UserCard = ({ user }) => {
    return (
      <div className="border p-4 rounded shadow-md pb-4 w-72 hover:scale-105 m-8">
        <h3 className="text-xl text-center font-semibold">{user.name}</h3>
        <p className="text-gray-600"># de Socio: {user.clientNumber}</p>
        <p className="text-gray-600">Vocacion: {user.vocacion}</p>
        <p className="text-gray-600">Teléfono: {user.phone}</p>
      </div>
    );
  };
  
  export default UserCard;
  