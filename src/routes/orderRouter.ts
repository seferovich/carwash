import express from "express"
import { orderController } from "../controllers/order"
import auth from "../middleware/auth"
const orderRouter = express.Router()


orderRouter.post('/api/orders/create', auth, orderController.create)
orderRouter.delete('/api/orders/remove/:id', auth, orderController.remove)
orderRouter.get('/api/orders/get/:id', auth, orderController.getOrderById)
orderRouter.get('/api/orders/get/customer/:id', auth, orderController.getOrderByCustomer)
orderRouter.get('/api/orders/get', auth, orderController.getAllOrders)


export default orderRouter