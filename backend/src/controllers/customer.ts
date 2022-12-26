import { Request, RequestHandler, Response } from "express";
import Customer from "../models/customerModel";


const create = async (req: Request, res: Response) => {
    try{
        const customer = await new Customer(req.body)
        await customer.save()
        res.status(201).send(customer)
    }catch(e){
        res.status(400).send(e)
    }
}

const remove = async (req: Request, res: Response) => {
    try{
        const customer = await Customer.findByIdAndRemove(req.params.id)
        if(!customer){
            return res.status(404)
        }
        
        res.status(200).send(customer)
    }catch(e){
        res.status(400).send(e)
    }
}

const update = async (req: Request, res: Response) => { 
    try{
        const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators:true})
        if(!customer){
            return res.status(404)
        }
        res.status(200).send(customer)
    }catch(e){
        res.status(401).send(e)
    }
}

const getCustomer = async (req: Request, res: Response) => { 
    try{
        const customer = await Customer.findById(req.params.id)
        if(!customer){
            return res.status(404)
        }
        res.status(200).send(customer)
    }catch(e){
        res.status(400).send(e)
    }
}

const getAllCustomers = async (req: Request, res: Response) => { 
    try{
        const customers = await Customer.find()
        if(!customers){
            return res.status(404)
        }
        res.status(200).send(customers)
    }catch(e){
        res.status(400).send(e)
    }
}




export const customerControllers = {
    create,
    update,
    remove,
    getCustomer,
    getAllCustomers
}
