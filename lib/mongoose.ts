import mongoose from 'mongoose';

export async function connectToDatabase() {
  mongoose.set('strictQuery', true);

  if (!process.env.MONGOOSE_URL) {
    console.error("MISSING MONGO_DB URI");
    return;
  }

  if (mongoose.connection.readyState === 1) {
    console.log("MONGO_DB ALREADY CONNECTED");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGOOSE_URL, {
      dbName: 'deals_office'
    });

    console.log("MONGO_DB CONNECTED.");

  } catch (error) {
    console.error('------------------------------------');
    console.error("FAILED TO CONNECT TO DATABASE");
    console.error('------------------------------------');
    throw error;
  }
}
