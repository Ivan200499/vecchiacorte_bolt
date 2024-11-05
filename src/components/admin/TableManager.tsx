import React, { useState } from 'react';
import QRCode from 'qrcode';
import { Download, Plus } from 'lucide-react';
import type { TableInfo } from '../../types';

interface TableManagerProps {
  tables: TableInfo[];
  onAddTable: (table: Omit<TableInfo, 'number'>) => void;
}

export default function TableManager({ tables, onAddTable }: TableManagerProps) {
  const [showAddTable, setShowAddTable] = useState(false);

  const generateQRCode = async (tableNumber: string) => {
    try {
      const url = `${window.location.origin}/menu/${tableNumber}`;
      const qrDataUrl = await QRCode.toDataURL(url);
      
      // Crea un link temporaneo per il download
      const link = document.createElement('a');
      link.href = qrDataUrl;
      link.download = `table-${tableNumber}-qr.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Errore nella generazione del QR code:', err);
    }
  };

  const handleAddTable = () => {
    onAddTable({ status: 'available' });
    setShowAddTable(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Gestione Tavoli</h2>
        <button
          onClick={() => setShowAddTable(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Aggiungi Tavolo
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tables.map((table) => (
          <div
            key={table.number}
            className="bg-white rounded-lg shadow-md p-6 flex flex-col"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">Tavolo {table.number}</h3>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 ${
                  table.status === 'available'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {table.status === 'available' ? 'Disponibile' : 'Occupato'}
                </span>
              </div>
              <button
                onClick={() => generateQRCode(table.number)}
                className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
                title="Scarica QR Code"
              >
                <Download className="w-5 h-5" />
              </button>
            </div>

            {table.currentOrder && (
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm text-gray-600">Ordine attivo:</p>
                <p className="text-sm font-medium">#{table.currentOrder}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {showAddTable && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Aggiungi Nuovo Tavolo</h3>
            <p className="text-gray-600 mb-6">
              Confermi di voler aggiungere un nuovo tavolo al sistema?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowAddTable(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Annulla
              </button>
              <button
                onClick={handleAddTable}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                Conferma
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}