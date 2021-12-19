export class GetProductByProductDTO{
    id: string;
    product: string;
    stock: number;
    category: string;
    image?: string;
    price: number;
    createDate: Date;
}