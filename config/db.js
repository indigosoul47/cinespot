import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });

        console.log(`[Init] Movie DB: (${conn.connection.host})`);
    } catch (error) {
        console.error(`[Error] DB: (${error.message})`);
        process.exit(1);
    }
}

export default connectDB;