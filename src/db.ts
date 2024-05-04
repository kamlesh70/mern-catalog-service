import mongoose from "mongoose";
import config from "config";

const connectDatabase = async () => {
  return await mongoose.connect(config.get("database.url"));
};

export default connectDatabase;
