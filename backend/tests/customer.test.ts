import app from "../src/app"
import request from "supertest"
import mongoose from "mongoose"
import Admin from "../src/models/adminModel"
import jwt from "jsonwebtoken"
import Customer from "../src/models/customerModel"

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

beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_TEST_URL as string)
    await new Admin(adminOne).save()
})

afterAll(async () => {
    await Admin.deleteMany()
    await Customer.deleteMany()
    await mongoose.disconnect()
})

beforeEach(async () => {
    await Customer.deleteMany()
    await new Customer(customerOne).save()
})


describe('POST, DELETE, PATCH, GET /api/customers', () => {
    describe('When admin is authenticated', () => {

        test('Should create a new customer', async () => {
            await request(app)
            .post('/api/customers/create')
            .set('Authorization', `Bearer ${adminOne.tokens[0].token}`)
            .send({
                name: 'Test Test',
                dob: '1969-04-25'
            })
            .expect(201)
        })

        test('Should update an existing customer', async () => {
            await request(app)
            .patch(`/api/customers/update/${customerOneId}`)
            .set('Authorization', `Bearer ${adminOne.tokens[0].token}`)
            .send({
                name: 'Test changed',
                dob: '1969-05-20'
            })
            .expect(200)
        })

        test('Should get a customer by the id', async () => {
            const response = await request(app)
            .get(`/api/customers/get/${customerOneId}`)
            .set('Authorization', `Bearer ${adminOne.tokens[0].token}`)
            .send()
            .expect(200)
            
            expect(response.body).toMatchObject({
                "__v": 0,
                "_id": customerOneId,
                "dob": "1969-04-20T00:00:00.000Z",
                "name": "Test Customer"
            })
        })

        test('Should get all customers', async () => {
            const response = await request(app)
            .get(`/api/customers/get`)
            .set('Authorization', `Bearer ${adminOne.tokens[0].token}`)
            .send()
            .expect(200)
        })

        test('Should delete a customer', async () => {
            const response = await request(app)
            .delete(`/api/customers/remove/${customerOneId}`)
            .set('Authorization', `Bearer ${adminOne.tokens[0].token}`)
            .send()
            .expect(200)
        })
    })


    describe('When admin is not authenticated', () => {

        test('Should not create a new customer', async () => {
            await request(app)
            .post('/api/customers/create')
            .send(customerOne)
            .expect(401)
        })

        test('Should not update an existing customer', async () => {
            await request(app)
            .patch(`/api/customers/update/${customerOneId}`)
            .send({
                name: 'Test changed',
                dob: '1969-05-20'
            })
            .expect(401)
        })

        test('Should not get a customer by the id', async () => {
            const response = await request(app)
            .get(`/api/customers/get/${customerOneId}`)
            .send()
            .expect(401)

        })

        test('Should not get all customers', async () => {
            const response = await request(app)
            .get(`/api/customers/get`)
            .send()
            .expect(401)
        })

        test('Should not delete a customer', async () => {
            const response = await request(app)
            .delete(`/api/customers/remove/${customerOneId}`)
            .send()
            .expect(401)
        })

    })
})