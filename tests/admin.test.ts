import app from "../src/app"
import request from "supertest"
import mongoose from "mongoose"
import Admin from "../src/models/adminModel"
import jwt from "jsonwebtoken"


const adminOneId = new mongoose.Types.ObjectId

const adminOne = {
    _id: adminOneId,
    username: 'TestAdminOne',
    password: '123456ekl',
    tokens:[{
        token: jwt.sign({_id: adminOneId}, process.env.JWT_SECRET as string)
    }]
}


beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_TEST_URL as string)
})

afterAll(async () => {
    // await Admin.deleteMany()
    await mongoose.disconnect()
})

describe('POST, DELETE, GET /api/admin', () => {

    describe('Given an username and password', () => {

        test('Should create a new admin account', async () => {
            const response = await request(app)
            .post('/api/admin/create')
            .send({
                username: 'test',
                password: '123456ekl'
            })
            .expect(201)

            // Assert that the admin is in the DB
            const admin = await Admin.findById(response.body.admin._id)
            expect(admin).not.toBeNull()
        })

        test('Should login into an existing admin account', async () => {
            const response = await request(app)
            .post('/api/admin/login')
            .send({
                username: 'test',
                password: '123456ekl'
            })
            .expect(200)
        })  

    })

    describe('Given a jwt token', () => {
        // Make a new admin acc before each test, because the token gets deleted after log out.
        beforeEach(async () => {
            await Admin.deleteMany()
            await new Admin(adminOne).save()
        })

        test('Should get admin account info', async () => {
            const response = await request(app)
            .get('/api/admin/get')
            .set('Authorization', `Bearer ${adminOne.tokens[0].token}`)
            .send()
            .expect(200)
        })

        test('Should log out of the admin account', async () => {
            const response = await request(app)
            .post('/api/admin/logout')
            .set('Authorization', `Bearer ${adminOne.tokens[0].token}`)
            .send()
            .expect(200)
        })

        test('Should delete an admin account', async () => {           
            const response = await request(app)
            .delete('/api/admin/delete')
            .set('Authorization', `Bearer ${adminOne.tokens[0].token}`)
            .send()
            .expect(200)
        })

    })
})



// name: Deploy

// on: push

// jobs:
  
//   build:
//     runs-on: ubuntu-latest
//     steps:      
//       - uses: actions/checkout@v3
//       - name: Use node
      
//         uses: actions/setup-node@v3
//         with:
//           node-version: 16 
             
//       - name: Install dependecies
//         run: npm install
//       - name: Run tests
//         env:
//             JWT_SECRET: ${{ secrets.JWT_SECRET}}
//             MONGODB_URL: ${{ secrets.MONGODB_TEST_URL }}
//         run: npm run test

//   deploy:
//     runs-on: ubuntu-latest
//     needs: [build]
//     steps:
//       - uses: actions/checkout@v2
//       - uses: akhileshns/heroku-deploy@v3.12.12 # This is the action
//         with:
//           heroku_api_key: ${{secrets.HEROKU_API_KEY}}
//           heroku_app_name: "carwash" 
//           heroku_email: "seferovicisa@gmail.com"