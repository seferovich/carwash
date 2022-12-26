import mongoose from "mongoose";
import { IOrder } from "../global/interfaces";
import getAge from "../helpers/getAge";
import Customer from "./customerModel";


const orderSchema = new mongoose.Schema({
    orders:[{     
            name: {
                type: String,
                default: 'Tyre Wash'
            },
            selected: {
                type: Boolean,
                default: false
            },
            price: {
                type: Number
            }
            
        },
        { 
            name: {
                type: String, 
                default: 'Body Wash'
            },
            selected: {
                type: Boolean,
                default: false
            },
            price: {
                type: Number
            }
        },

        {   
            name: {
                type: String,
                default: 'Interior cleaning'
            },
            selected: {
                type: Boolean,
                default: false
            },
            price: {
                type: Number
            }
            
        },

        { 
            name: {
                type: String,
                default: 'Interior vacuuming'
            },
            selected: {
                type: Boolean,
                default: false
            },
            price: {
                type: Number
            }
            
        }
    ],
    total: {
        type: Number
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null
    }
}, {
    timestamps: true
})


// Loops trough the array of objects and calculatest the total price
// Adds a point to customer points
// If the customer has 10 points, discount is 20%
// If the customer is older than 65 discount is 10% (adds to the 20% if the customer has 10 points)
orderSchema.pre('save', async function () {
    const order = this
    const customer = await Customer.findOne({_id: order.customer}) 
    let totalPrice = 0
    
    if(customer && typeof customer !== null || undefined){
        customer!.points++
        if(customer!.points === 10){
            totalPrice = totalPrice - (totalPrice * .20)
        }
    
        const customerAge = getAge(customer!.dob)
    
        if(customerAge >= 65){
            totalPrice = totalPrice - (totalPrice * .10)
        }
        
    }
    
    for (const item of order.orders) {
        if (item.selected && typeof item.price !== 'undefined') {
            totalPrice += item.price
        }
    }

    

    order.total = totalPrice

    
})



const Order = mongoose.model<IOrder>('Order', orderSchema)

export default Order