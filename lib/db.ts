import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://dualdeveloper002:akshay123@cluster0.cxhro.mongodb.net/crowd'

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit process with failure
  }
}

export default connectDB;