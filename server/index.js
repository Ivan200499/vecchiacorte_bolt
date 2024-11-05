import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// Store degli ordini in memoria (in produzione usare un database)
const orders = new Map();
const tables = new Map();

io.on('connection', (socket) => {
  console.log('Client connected');

  // Invia gli ordini esistenti al client
  socket.emit('orders:update', Array.from(orders.values()));

  // Gestione nuovo ordine
  socket.on('order:submit', (orderData) => {
    const order = {
      id: uuidv4(),
      ...orderData,
      status: 'pending',
      total: calculateTotal(orderData.items),
    };

    orders.set(order.id, order);
    io.emit('orders:update', Array.from(orders.values()));
    console.log('New order:', order);
  });

  // Aggiornamento stato ordine
  socket.on('order:updateStatus', ({ orderId, status }) => {
    const order = orders.get(orderId);
    if (order) {
      order.status = status;
      orders.set(orderId, order);
      io.emit('order:status', { orderId, status });
      io.emit('orders:update', Array.from(orders.values()));
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Calcola il totale dell'ordine
function calculateTotal(items) {
  return items.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
}

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});