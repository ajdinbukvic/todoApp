const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');

dotenv.config({ path: './config.env' });

const DB = process.env.DB_CONNECTION.replace(
  '<password>',
  process.env.DB_PASSWORD
);

mongoose
  .connect(DB)
  // .connect(DB, {
  //   useNewUrlParser: true,
  //   useCreateIndex: true,
  //   useFindAndModify: false,
  // })
  .then(() => console.log('DB connected...'));

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`App running on port: ${port}...`);
});
