export interface Category {
    _id?:string|number,
    name:string,
}
export interface CategoryApiResponse {
    message: string;
    data: Category[];
  }