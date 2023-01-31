import { IOrder } from "../../globals/interfaces"
import axios from "axios"


const create = async (customerData: IOrder, token: string) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.post('/api/orders/create', customerData, config)

    return response.data
}  

const getAll = async (token: string) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get('/api/orders/get', config)

    return response.data
}

const getByCustomerId = async (customerId: string | number, token: string) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(`/api/orders/get/customer/${customerId}`, config)
    
    return response.data

}

const remove = async (id: number | string, token: string) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.delete(`/api/orders/remove/${id}`, config)
    return response.data
}


export const orderServices = {
    create,
    getAll,
    getByCustomerId,
    remove
}