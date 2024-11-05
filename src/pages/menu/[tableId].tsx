import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useOrderStore } from '../../store/orderStore';
import Header from '../../components/Header';
import MenuCard from '../../components/MenuCard';
import CategoryFilter from '../../components/CategoryFilter';
import Cart from '../../components/Cart';

export default function TableMenu() {
  const { tableId } = useParams();
  const setCurrentTable = useOrderStore((state) => state.setCurrentTable);

  useEffect(() => {
    if (tableId) {
      setCurrentTable(tableId);
    }
  }, [tableId, setCurrentTable]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header tableNumber={tableId} />
      <main className="max-w-7xl mx-auto pt-20 pb-16">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Benvenuti al Sushi Haven</h1>
          <p className="mt-2 text-gray-600">Tavolo {tableId}</p>
        </div>
        
        {/* Il resto del componente rimane uguale all'App.tsx originale */}
      </main>
    </div>
  );
}