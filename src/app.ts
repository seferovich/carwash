import express from "express"
import 'express-async-errors'
import dotenv from "dotenv"
import helmet from "helmet"
import cors from "cors" 
import adminRouter from "./routes/adminRouter"
import customerRouter from "./routes/customerRouter"
import orderRouter from "./routes/orderRouter"
import path from "path"
import {Request, Response} from "express"

// Config
dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(cors())

// Routers
app.use(adminRouter)
app.use(customerRouter)
app.use(orderRouter)

app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/*', (req: Request, res: Response) => {
 res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

export default app