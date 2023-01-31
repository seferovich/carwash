import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
import { IAdmin, IAdminModel } from "../global/interfaces";
import jwt from "jsonwebtoken";

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

// Hashing the password before saving to DB
adminSchema.pre('save', async function (next) {
    const admin = this
    const salt = await bcrypt.genSalt(12) 
    if(admin.isModified('password')){
        admin.password = await bcrypt.hash(admin.password, salt)
    }    
    next()
})

adminSchema.methods.generateAuthToken = async function () {
    const admin = this as IAdmin
    const token = jwt.sign({ _id: admin._id.toString() }, process.env.JWT_SECRET as string)

    admin.tokens = admin.tokens?.concat({ token })
    await admin.save()

    return token
}

// Finding admin by username and comparing passwords
adminSchema.statics.findByCredentials = async (username: string, password: string) => {
    const admin = await Admin.findOne({username})

    if(!admin) {
        throw new Error('Could not find!')
    }

    const isMatch = await bcrypt.compare(password, admin.password)
    
    if(!isMatch){
        throw new Error('Password incorrect')
    }

    return admin
}

adminSchema.methods.toJSON = function() {
    const admin = this as IAdmin
    const adminObject = admin.toObject()
    delete adminObject.password
    delete adminObject.tokens
    return adminObject
}



const Admin = mongoose.model<IAdmin, IAdminModel>('Admin', adminSchema)

export default Admin