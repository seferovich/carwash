import axios from "axios"
import {IAdmin} from "../../globals/interfaces"

const link = process.env.PORT || 'http://localhost:5001'
const login = async (adminData: IAdmin) => {
    // Added this link so it works on Heroku
    const response = await axios.post('/api/admin/login', adminData)

    if (response.data){
        localStorage.setItem('jwt', JSON.stringify(response.data.token))
    }
    return response.data
}   
const logout = async (token: string) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      // Added this link so it works on Heroku
    await axios.post('http://localhost:5001/api/admin/logout', undefined, config)
    localStorage.removeItem('jwt')
}
export const authServices = {
    login,
    logout
} 