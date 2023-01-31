import { ICustomer } from "../../globals/interfaces"
import axios from "axios"




const create = async (customerData: ICustomer, token: string) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.post('http://localhost:5001/api/customers/create', customerData, config)

    return response.data
}  

const getAll = async (token: string) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get('http://localhost:5001/api/customers/get', config)

    return response.data
}

const getById = async (userId: string | number, token: string) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(`http://localhost:5001/api/customers/get/${userId}`, config)

    return response.data
}

const remove = async (customerId: number | string, token: string) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.delete(`http://localhost:5001/api/customers/remove/${customerId}`, config)
    return response.data
}


export const customerServices = {
    create,
    getAll,
    getById,
    remove
}