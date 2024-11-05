import React from 'react';
import { Menu, ShoppingCart } from 'lucide-react';

interface HeaderProps {
  tableNumber?: string;
  cartItemCount: number;
  onCartClick: () => void;
}

export default function Header({ tableNumber, cartItemCount, onCartClick }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Menu className="w-6 h-6 text-gray-700" />
          <h1 className="text-xl font-bold text-gray-800">Sushi Haven</h1>
        </div>
        
        {tableNumber && (
          <div className="absolute left-1/2 -translate-x-1/2 bg-gray-100 px-3 py-1 rounded-full">
            <span className="text-sm font-medium">Table {tableNumber}</span>
          </div>
        )}

        <button
          onClick={onCartClick}
          className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ShoppingCart className="w-6 h-6 text-gray-700" />
          {cartItemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}