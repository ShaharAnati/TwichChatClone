const mongoose = require("mongoose");

export const connectToDatabase = async () => {
    mongoose
      .connect(process.env.MONGO_URI || 'mongodb+srv://twichchatClone:mbuP7T3fZrevn0iU@twichchatclone.wwufmlr.mongodb.net/ChatRoom', {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then(() => {
        console.log("Successfully connected to database");
      })
      .catch((error: Error) => {
        console.log('error: ' + JSON.stringify(error));
        console.log("database connection failed. exiting now...");
        console.error(error);
        process.exit(1);
      });
  };