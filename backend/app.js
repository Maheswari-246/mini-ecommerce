const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const connectDatabase = require('./config/connectDatabase');

// Load environment variables
dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });

// Connect to database
connectDatabase();

// ✅ Define allowed origins
const allowedOrigins = [
  'http://localhost:3000',
  'https://mini-ecommerce-frontend-8gr7.onrender.com'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
};

// ✅ Use CORS with options
app.use(cors(corsOptions));

// Middleware
app.use(express.json());

// Routes
const products = require('./routes/product');
const orders = require('./routes/order');
app.use('/api/v1/', products);
app.use('/api/v1/', orders);

// Static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'frontend', 'build', 'index.html'));
  });
}

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT} in ${process.env.NODE_ENV}`);
});
