const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config({ path: 'config.env' });
const ApiError = require('./utils/apiError');
const globalError = require('./middlewares/errorMiddleware');
const dbConnection = require('./config/database');
const categoryRoute = require('./routes/categoryRoute');

// Connect with db
dbConnection();

// express app
const app = express();

// Middlewares
app.use(express.json());

if (process.env.NODE_ENV === 'devlopment') {
  app.use(morgan('dev'));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

// Mount Routes
app.use('/api/v1/categories', categoryRoute);

app.all('*', (req, res, next) => {
  // const err = new Error(`can't find the route ${req.originalUrl}`);
  // next(err.message)
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

// Global error handling middleware
app.use(globalError);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`App running running on port ${PORT}`);
});