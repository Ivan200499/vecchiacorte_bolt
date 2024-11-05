import React from 'react';
import type { MenuItem } from '../types';

interface MenuCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
}

export default function MenuCard({ item, onAddToCart }: MenuCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
          <span className="text-lg font-bold text-gray-900">
            ${item.price.toFixed(2)}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-4">{item.description}</p>
        <button
          onClick={() => onAddToCart(item)}
          disabled={!item.available}
          className={\`w-full py-2 px-4 rounded-md transition-colors \${
            item.available
              ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }\`}
        >
          {item.available ? 'Add to Order' : 'Unavailable'}
        </button>
      </div>
    </div>
  );
}