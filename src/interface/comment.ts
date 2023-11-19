export interface IComment {
    _id?: number|string; 
    nameuser:string;
    productId: string;
    content: string ; 
    userId: string; // Thêm thuộc tính userId với kiểu dữ liệu phù hợp
} 
export interface ICommentApiResponse {
    data: IComment[]; 
    message: string;
}