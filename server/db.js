// Simulazione database in memoria
export const menuItems = new Map();
export const orders = new Map();
export const tables = new Map();

// Funzioni helper per il database
export const addMenuItem = (item) => {
  menuItems.set(item.id, item);
};

export const updateMenuItem = (id, item) => {
  if (menuItems.has(id)) {
    menuItems.set(id, { ...menuItems.get(id), ...item });
    return true;
  }
  return false;
};

export const deleteMenuItem = (id) => {
  return menuItems.delete(id);
};

export const getMenuItems = () => {
  return Array.from(menuItems.values());
};

export const addOrder = (order) => {
  orders.set(order.id, order);
};

export const updateOrder = (id, order) => {
  if (orders.has(id)) {
    orders.set(id, { ...orders.get(id), ...order });
    return true;
  }
  return false;
};

export const getOrders = () => {
  return Array.from(orders.values());
};