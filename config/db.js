import mongoose from "mongoose";

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI not defined");
  }

  const conn = await mongoose.connect(process.env.MONGO_URI, {
    dbName: "ecommerce"
  });

  return conn;
};

export default connectDB;
