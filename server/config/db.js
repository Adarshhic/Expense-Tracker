import mongoose from "mongoose";
import dns from "node:dns";

dns.setServers([
  '1.1.1.1',
  '8.8.8.8'
]);

export async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error("MONGO_URI is not set in the environment");
  }

  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
}
