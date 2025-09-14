import mongoose, { mongo } from "mongoose"
import { MONGO_URI } from "../config.js"


const connectToMongo = async () => {
    const connection = await mongoose.connect(`${MONGO_URI}/sishyarthi`)
    return connection
}

export default connectToMongo