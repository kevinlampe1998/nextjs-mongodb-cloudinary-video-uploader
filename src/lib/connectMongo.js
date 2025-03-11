import mongoose from "mongoose";

const connectMongo = async () => {
    
    try {

        if (mongoose.connection.readyState !== 1) {
            console.log("Connecting to MongoDB...");
            console.log('process.env.MONGODB_URI', process.env.MONGODB_URI);
            await mongoose.connect(process.env.MONGODB_URI,
                // { 
                //     useNewUrlParser: true, 
                //     useUnifiedTopology: true 
                // }
            );
            console.log("Connected to MongoDB!");
        }

    } catch(err) {

        console.log('Error connecting MongoDB', err);
        console.log('Error connecting MongoDB');

    }
};

export default connectMongo;