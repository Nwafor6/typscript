import express, { Application, Express} from "express"
import cors from "cors"
import userRoutes from "./routes/userRoutes";



const app:Application = express();

app.use(
    cors({
        origin: '*',
        methods:['GET',"POST","PUT","DELETE"],
        credentials:true,
    })
    )
app.use(express.json())
app.use("/", userRoutes)
export default app;