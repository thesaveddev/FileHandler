import mongoose from 'mongoose';

const connect = () => {
  console.log("Connecting to DB: ", process.env.DB_NAME)
  mongoose.connect(`${process.env.MONGO_URI}${process.env.DB_NAME}`);
  const db = mongoose.connection;

  db.on('error', (error) => {
    console.error('Connection Error:', error);
  });

  db.once('open', () => {
    console.log('DB Connected');
  });
};

export default connect