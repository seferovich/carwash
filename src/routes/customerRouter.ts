import express from "express"
import { customerControllers } from "../controllers/customer"
import auth from "../middleware/auth"
const customerRouter = express.Router()

customerRouter.post('/api/customers/create', auth, customerControllers.create)
customerRouter.patch('/api/customers/update/:id', auth, customerControllers.update)   
customerRouter.delete('/api/customers/remove/:id', auth, customerControllers.remove)
customerRouter.get('/api/customers/getById/:id', auth, customerControllers.getCustomer)
customerRouter.get('/api/customers/get', auth, customerControllers.getAllCustomers)


export default customerRouter