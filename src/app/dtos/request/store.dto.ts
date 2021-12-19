export class RegisterStockDTO{
    product: string;
    price: number;
    stock: number;
    category: string;
    image?: string;
}
export class UpdateStockDTO{
    id: string;
    product: string;
    price: number;
    stock: number;
    category: string;
    image?: string;
}