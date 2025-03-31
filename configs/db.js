import mongoose from "mongoose";

const connectDB = async () => {

 
      await mongoose.connect(process.env.MONGO_URI)
     mongoose.connection.on("connected",()=>{
      console.log('DB Connected')
     })


      

   

}

export default connectDB