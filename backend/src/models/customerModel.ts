import mongoose, { Schema } from "mongoose";
import { ICustomer } from "../global/interfaces";

const customerSchema: Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true
    },
    points: {
        type: Number,   
    }
})
 
// Reset customer points after 11th run
customerSchema.pre('save', function(){
    const customer = this
    if(customer.points === 11){
        customer.points = 1
    }
})



const Customer = mongoose.model<ICustomer>('Customer', customerSchema)

export default Customer