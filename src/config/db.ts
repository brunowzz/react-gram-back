import mongoose from "mongoose";

const user = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

export async function connection() {
  try {
    return await mongoose.connect(
      `mongodb+srv://${user}:${password}@cluster0.pkews.mongodb.net/`
    );
  } catch (error) {
    console.error(error);
  }
}
