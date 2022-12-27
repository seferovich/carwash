import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import Admin from "../models/adminModel"


const auth = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const token = req.header("Authorization")?.replace("Bearer ", "")
        const decoded: any = jwt.verify(token as string, process.env.JWT_SECRET as string)
        const admin = await Admin.findOne({
            _id: decoded._id,
            "tokens.token": token,
        });

        if(!admin){
            throw new Error('Not found')
        }
        req.token = token 
        req.admin = admin
        next()
    } catch (e) {
        res.status(401).send(e)
    }
}


export default auth