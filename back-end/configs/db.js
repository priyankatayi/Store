import mongoose from "mongoose"

const connectDB = async() => {
    try{
       
       
        // mongoose.connection.on('connected', () => {
            // console.log('sucessfully connected');
        // })
        await mongoose.connect(`${process.env.MONGODB_URI}/grocerystore`)
        console.log('Database Connected');
    }
    catch(error) {
        console.log(error.message)
    }
}

export default connectDB;