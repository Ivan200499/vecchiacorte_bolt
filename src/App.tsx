import React, { useState } from 'react';
import Header from './components/Header';
import MenuCard from './components/MenuCard';
import CategoryFilter from './components/CategoryFilter';
import Cart from './components/Cart';
import { useSocket } from './hooks/useSocket';
import { useOrderStore } from './store/orderStore';
import type { MenuItem } from './types';

const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Dragon Roll',
    description: 'Gamberi tempura, cetriolo, avocado e salsa eel',
    price: 16.99,
    category: 'Roll Speciali',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    available: true,
  },
  // ... altri elementi del menu
];

function App() {
  useSocket(); // Inizializza il WebSocket

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cartItems, setCartItems] = useState<Array<{ item: MenuItem; quantity: number }>>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const submitOrder = useOrderStore((state) => state.submitOrder);
  const tableNumber = '12';

  const categories = Array.from(
    new Set(menuItems.map((item) => item.category))
  );

  const filteredItems = selectedCategory === 'all'
    ? menuItems
    : menuItems.filter((item) => item.category === selectedCategory);

  const handleAddToCart = (item: MenuItem) => {
    setCartItems(current => {
      const existingItem = current.find(({ item: i }) => i.id === item.id);
      if (existingItem) {
        return current.map(cartItem =>
          cartItem.item.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...current, { item, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems(current => current.filter(({ item }) => item.id !== itemId));
    } else {
      setCartItems(current =>
        current.map(cartItem =>
          cartItem.item.id === itemId
            ? { ...cartItem, quantity: newQuantity }
            : cartItem
        )
      );
    }
  };

  const handleSubmitOrder = () => {
    submitOrder(tableNumber, cartItems);
    setCartItems([]);
    setIsCartOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        tableNumber={tableNumber}
        cartItemCount={cartItems.reduce((sum, { quantity }) => sum + quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
      />
      
      <main className="max-w-7xl mx-auto pt-20 pb-16">
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {filteredItems.map((item) => (
            <MenuCard
              key={item.id}
              item={item}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </main>

      {isCartOpen && (
        <Cart
          items={cartItems}
          onClose={() => setIsCartOpen(false)}
          onUpdateQuantity={handleUpdateQuantity}
          onSubmitOrder={handleSubmitOrder}
        />
      )}
    </div>
  );
}