export interface IRating {
    _id: string;
    productId:string 
    rating: number; 
    userId:string;
    feedback:string
}

export interface IRatingApiResponse {
    data: IRating[]; 
    message: string;
}