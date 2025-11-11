
import React, { useContext } from "react";
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-3xl mb-4">Welcome to Dashboard 🎉</h2>
      <button onClick={logout} className="bg-red-500 text-white p-2 rounded">Logout</button>
    </div>
  );
};

export default Dashboard;
