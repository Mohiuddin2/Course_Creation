const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors'); 
const dotenv = require('dotenv');
const db = require('./config/db')

// Laod env vars
dotenv.config({ path: './config/config.env' });

// Load models
const Bootcamp = require('./models/Bootcamp');
const Course  = require('./models/Course');

// Connect to DB
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }); or
db()

// Read JSON Files
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/data/bootcamps.json`, 'utf-8')
);
const course = JSON.parse(
  fs.readFileSync(`${__dirname}/data/courses.json`, 'utf-8')
);


// Import into DB
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    await Course.create(course);
    console.log('Data Created..'.green.inverse);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};
// Delete Data
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
    await Course.deleteMany();
    console.log('Data Destroyed..'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

console.log(process.argv)

if (process.argv[2] === '-i') {
  importData();
}else if (process.argv[2] === '-d'){
    deleteData()
}
