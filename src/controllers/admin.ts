import Admin from "../models/adminModel";
import { Request, Response } from "express";

const register = async (req: Request, res: Response) => {
    const admin = new Admin(req.body)
    try{
        await admin.save()
        const token = await admin.generateAuthToken()
        res.status(201).send({admin, token})
    }catch(e){
        res.status(400).send(e)
    }
}

const login = async (req: Request, res: Response) => {   
    try{
        const admin = await Admin.findByCredentials(req.body.username, req.body.password)
        const token = await admin.generateAuthToken()
        return res.status(200).send({admin, token})
    }catch(e){
        return res.status(500).send(`Incorrect password or username!`)
    }
}

const logout = async (req: Request, res: Response) => {
    try{
        req.admin.tokens = req.admin.tokens?.filter((token: any) => {
            return token.token !== req.token
        })
        await req.admin.save()
        res.send('Logged out')
    }catch(e){
        res.status(500).send(e)
    }
        
}

const getAdmin = async (req: Request, res: Response) => {
    try{
        res.status(200).send(req.admin)
    }catch(e){
        res.status(500).send(e)
    }
        
}

const remove = async (req: Request, res: Response) => {
    try {
        await req.admin.remove()
        res.send(req.admin)
    } catch (e) {
        res.status(500).send(e)
    }
}


export const adminController = {
    register,
    login,
    logout,
    getAdmin,
    remove
}