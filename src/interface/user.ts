export interface IUsers {
    _id?:string|number,
    name?:string,
    email?: string,
    img?: string,
    comment?: string |number,
    password?: number,
    phoneNumber?:number,
    role?:string,
    secret: string,
    accessToken?: string;
}
export interface IProductApiResponseUser {
    message: string;
    data : IUsers[]
  }
  