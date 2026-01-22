import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config();
dotenv.config({ path: path.resolve(__dirname, ".env") });




const db = async () => {
    try {
        const uri = process.env.MONGO_URI || process.env.MONGODB_URI || "mongodb://localhost:27017/frostyfits";
        await mongoose.connect(uri);

        console.log("database connected");


    } catch (err) {

        console.log(err.message);
        process.exit(1);

    }

};

export default db;
