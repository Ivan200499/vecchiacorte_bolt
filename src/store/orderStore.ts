import { create } from 'zustand';
import { io } from 'socket.io-client';
import type { Order, MenuItem, TableInfo } from '../types';

interface OrderState {
  orders: Order[];
  currentOrder: Order | null;
  currentTable: string | null;
  tables: TableInfo[];
  socket: any;
  initializeSocket: () => void;
  setCurrentTable: (tableNumber: string) => void;
  submitOrder: (tableNumber: string, items: Array<{ item: MenuItem; quantity: number }>) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  addTable: () => void;
}

const SOCKET_URL = 'http://localhost:3001';

export const useOrderStore = create<OrderState>((set, get) => ({
  orders: [],
  currentOrder: null,
  currentTable: null,
  tables: [],
  socket: null,

  initializeSocket: () => {
    const socket = io(SOCKET_URL);

    socket.on('orders:update', (orders: Order[]) => {
      set({ orders });
    });

    socket.on('tables:update', (tables: TableInfo[]) => {
      set({ tables });
    });

    socket.on('order:status', ({ orderId, status }) => {
      set((state) => ({
        orders: state.orders.map((order) =>
          order.id === orderId ? { ...order, status } : order
        ),
        currentOrder:
          state.currentOrder?.id === orderId
            ? { ...state.currentOrder, status }
            : state.currentOrder,
      }));
    });

    set({ socket });
  },

  setCurrentTable: (tableNumber) => {
    set({ currentTable: tableNumber });
  },

  submitOrder: (tableNumber, items) => {
    const { socket } = get();
    if (!socket) return;

    const order = {
      tableNumber,
      items: items.map(({ item, quantity }) => ({
        menuItemId: item.id,
        quantity,
      })),
      timestamp: new Date().toISOString(),
    };

    socket.emit('order:submit', order);
  },

  updateOrderStatus: (orderId, status) => {
    const { socket } = get();
    if (!socket) return;

    socket.emit('order:updateStatus', { orderId, status });
  },

  addTable: () => {
    const { socket } = get();
    if (!socket) return;

    socket.emit('table:add');
  },
}));