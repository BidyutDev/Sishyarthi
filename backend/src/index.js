import express from "express"
import cors from "cors"
import router from "./routes/index.js"
import { PORT } from "./config.js"
import connectToMongo from "./db/db.js"


const app = express()

app.use(cors())
app.use(express.json())
app.use("/api/v1" , router)

app.listen(PORT , ()=> {
    connectToMongo().then(data => {
        console.log(`Successfully connected to mongodb : ${data.connection.host}`)
    }).catch(err => {
        console.log(err)
    })
    console.log(`Server is running on ${PORT}`)
})