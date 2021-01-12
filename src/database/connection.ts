import { connect, connection } from "mongoose";

const connectDB = async () => {
    try {
        await connect(process.env.MONGO_URI!, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });

        console.log(`MongoDB Connected ${connection.host}`)
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
}

export default connectDB;