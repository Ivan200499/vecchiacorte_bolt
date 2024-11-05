import React from 'react';
import { X, Minus, Plus } from 'lucide-react';
import type { MenuItem } from '../types';

interface CartProps {
  items: Array<{ item: MenuItem; quantity: number }>;
  onClose: () => void;
  onUpdateQuantity: (itemId: string, newQuantity: number) => void;
  onSubmitOrder: () => void;
}

export default function Cart({ items, onClose, onUpdateQuantity, onSubmitOrder }: CartProps) {
  const total = items.reduce((sum, { item, quantity }) => sum + item.price * quantity, 0);

  if (items.length === 0) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div className="bg-white w-full max-w-md mx-4 rounded-lg shadow-xl">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-xl font-semibold">Il tuo ordine</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-8 text-center text-gray-500">
            Il tuo carrello è vuoto
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-md mx-4 rounded-lg shadow-xl max-h-[90vh] flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Il tuo ordine</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          {items.map(({ item, quantity }) => (
            <div key={item.id} className="flex items-center py-4 border-b">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
              <div className="ml-4 flex-1">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-gray-500 text-sm">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onUpdateQuantity(item.id, quantity - 1)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center">{quantity}</span>
                <button
                  onClick={() => onUpdateQuantity(item.id, quantity + 1)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t">
          <div className="flex justify-between mb-4">
            <span className="font-semibold">Totale:</span>
            <span className="font-semibold">${total.toFixed(2)}</span>
          </div>
          <button
            onClick={onSubmitOrder}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Conferma Ordine
          </button>
        </div>
      </div>
    </div>
  );
}