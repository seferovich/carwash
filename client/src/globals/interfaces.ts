export interface IAdmin {
    username: string,
    password: string
}


export interface ICustomer {
    name: string, 
    dob: Date | string,
    _id?: string,
    points?: number
}


export interface IOrder {
    orders: [
      {
        name: string,
        price: number,
        selected: boolean
      },
      {
        name: string,
        price: number,
        selected: boolean
      },
      {
        name: string,
        price: number,
        selected: boolean
      },
      {
        name: string,
        price: number,
        selected: boolean
      }
    ],
    _id?: string,
    total?: number,
    createdAt?: string | Date,
    customer?: number | string | null
  }