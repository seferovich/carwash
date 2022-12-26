import app from "../src/app"
import request, { Response } from "supertest"
import mongoose from "mongoose"
import Admin from "../src/models/adminModel"
import Customer from "../src/models/customerModel"
import jwt from "jsonwebtoken"
import Order from "../src/models/orderModel"
import { IOrder } from "../src/global/interfaces"



const adminOneId = new mongoose.Types.ObjectId
const adminOne = {
    _id: adminOneId,
    username: 'TestAdminOne',
    password: '123456ekl',
    tokens:[{
        token: jwt.sign({_id: adminOneId}, process.env.JWT_SECRET as string)
    }]
}
const customerOneId = new mongoose.Types.ObjectId
const customerOne = {
    _id: customerOneId,
    name: 'Test Customer',
    dob: '1969-04-20'
}

const customerTwoId = new mongoose.Types.ObjectId
const customerTwo = {
    _id: customerTwoId,
    name: 'Test Customer2',
    dob: '1948-04-20',
    points: 10
}

const orderOneId = new mongoose.Types.ObjectId
const orderOne = {
    orders:[
    {
        name: "Tyre wash",
        price: 8,
        selected: true
    },
    {
        name: "Body wash",
        price: 12,
        selected: false
    },
    {
        name: "Interior washing",
        price: 12,
        selected: false
    },
    {
        name: "Interior vacumming",
        price: 8,
        selected: true
    }
],
_id: orderOneId,
customer: customerOneId
}

beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_TEST_URL as string)
    await new Admin(adminOne).save()
    await new Customer(customerTwo).save()
})

afterAll(async () => {
    await Admin.deleteMany()
    await Customer.deleteMany()
    await Order.deleteMany()
    await mongoose.disconnect()
})



describe('POST, DELETE, GET /api/orders', () => {
    describe('When admin is authenticated', () => {

        test('Should create a new order, with and without a customer _id provided', async () => {
            const responseOne = await request(app)
            .post('/api/orders/create')
            .set('Authorization', `Bearer ${adminOne.tokens[0].token}`)
            .send({
                orders:[
                {
                    name: "Tyre wash",
                    price: 8,
                    selected: true
                },
                {
                    name: "Body wash",
                    price: 12,
                    selected: false
                },
                {
                    name: "Interior washing",
                    price: 12,
                    selected: false
                },
                {
                    name: "Interior vacumming",
                    price: 8,
                    selected: true
                }
            ],
            customer: customerOneId
            })
            .expect(201)

            expect(responseOne.body.total).toEqual(16)


            // No customer _id
            const responseTwo = await request(app)
            .post('/api/orders/create')
            .set('Authorization', `Bearer ${adminOne.tokens[0].token}`)
            .send({
                orders:[
                {
                    name: "Tyre wash",
                    price: 8,
                    selected: true
                },
                {
                    name: "Body wash",
                    price: 12,
                    selected: false
                },
                {
                    name: "Interior washing",
                    price: 12,
                    selected: false
                },
                {
                    name: "Interior vacumming",
                    price: 8,
                    selected: true
                }
            ]})
            .expect(201)
        })
        describe('Given different customers', () => {
            test('Should give a 30% discount because customer has 10 points and is 60+ years older', async () => {


                const response = await request(app)
                .post('/api/orders/create')
                .set('Authorization', `Bearer ${adminOne.tokens[0].token}`)
                .send({
                    orders:[
                    {
                        name: "Tyre wash",
                        price: 8,
                        selected: true
                    },
                    {
                        name: "Body wash",
                        price: 12,
                        selected: false
                    },
                    {
                        name: "Interior washing",
                        price: 12,
                        selected: false
                    },
                    {
                        name: "Interior vacumming",
                        price: 8,
                        selected: true
                    },
                    
                ],
                    customer: customerTwoId
                }).expect(201)

                expect(response.body.total).toEqual(11.52)
                
            
            })
        })
    })
})