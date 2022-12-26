import mongoose from "mongoose"
import { AdminType } from "./types"
import { Request } from "express"

export interface IOrder extends mongoose.Document {
    orders: [     
        {
            name: string,
            selected: boolean,
            price: number
        },
        {
            name: string,
            selected: boolean,
            price: number
        },
        {
            name: string,
            selected: boolean,
            price: number
        },
        {
            name: string,
            selected: boolean,
            price: number
        },
    ],
    customer?: mongoose.Types.ObjectId | null, 
    total: number
}

export interface ICustomer extends mongoose.Document{
    name: string,
    dob: Date,
    points: number
}

export interface IAdmin extends mongoose.Document{
    username: string,
    password: string,
    tokens: {token: string}[],
    _id: mongoose.Types.ObjectId,
    generateAuthToken(): string,
    
}

export interface IAdminModel extends mongoose.Model<IAdmin> {
    // here we decalre statics
    findByCredentials(username: string, password: string): IAdmin
}
// export interface IReqAdmin extends Request{
//     token?: string,
//     admin: IAdmin
// }

export interface IJwtPayload {
    _id: string
}

