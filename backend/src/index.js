import express from "express"
import cors from "cors"
import router from "./routes"
import { PORT } from "./config"


const app = express()

app.use(cors())
app.use(express.json())
app.use("/api/v1" , router)

app.listen(PORT , ()=> {
    console.log(`Server is running on ${PORT}`)
})