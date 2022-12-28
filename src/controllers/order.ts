import { Request, RequestHandler, Response } from "express"
import Order from "../models/orderModel"


const create = async (req: Request, res: Response) => {
    try{
        const order = new Order(req.body)
        if (!order.customer) {
            order.customer = null
        }
        await order.save()
        res.status(201).send(order)
    }catch(e){
        res.status(400).send(e)
    }
}

const remove = async (req: Request, res: Response) => {
    try{
        const order = await Order.findByIdAndRemove(req.params.id)
        if(!order){
            res.status(404).send('Not found')
        }
        res.status(200).send(order)
    }catch(e){
        res.status(400).send(e)
    }
}

const getOrderById = async (req: Request, res: Response) => {
    try{
        const order = await Order.findById(req.params.id)
        if(!order){
            res.status(404).send('Not found')
        }
        res.status(200).send(order)
    }catch(e){
        res.status(400).send(e)
    }
}

const getAllOrders = async (req: Request, res: Response) => {
    try{
        const orders = await Order.find({})
        if(!orders){
            res.status(404).send('Not found')
        }
        res.status(200).send(orders)
    }catch(e){
        res.status(400).send(e)
    }
}


export const orderController = {
    create,
    getOrderById,
    getAllOrders,
    remove
}