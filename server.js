const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const fileupload = require('express-fileupload')
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error')

// console.error(new Error('Whoops, something bad happened'));
//Loan env vars
dotenv.config({ path: './config/config.env' });

// Connect DB
connectDB();

// Routes file;
const bootcampsRoutes = require('./routes/bootcamps');
const courseRoutes = require('./routes/courses');
const auth = require('./routes/auth');

const app = express();
// Body Parser
app.use(express.json());
// app.use(express.urlencoded({extended: true}));
// app.use(express.urlencoded({ extended: true }));

// Dev loggin middleware --want to run into development env
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// File Upload
app.use(fileupload());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')))

//Mounting Routes
app.use('/api/v1/bootcamps/', bootcampsRoutes);
app.use('/api/v1/courses/', courseRoutes);
app.use('/api/v1/auth/', auth);

app.use(errorHandler);
const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server Running on ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
);
//Handle Unhandled promise rejection
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  //close server & exit process
  // server.close(() => process.exit(1))
})
