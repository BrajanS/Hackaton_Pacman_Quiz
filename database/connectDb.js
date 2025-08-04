import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/hackaton_quiz");
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB Connection error:", {
      message: err.message,
      name: err.name,
      path: err.stack.split("\n")[1],
    });
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log("MongoDB Disconnected successfully");
  } catch (err) {
    console.error("MongoDB couldn't Disconnect:", {
      message: err.message,
      name: err.name,
      path: err.stack.split("\n")[1],
    });
  }
};

export { connectDB, disconnectDB };
