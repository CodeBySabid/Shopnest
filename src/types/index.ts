export interface Product {
    _id?: string;
    name: string;
    price: number;
    description: string;
    image: string;
    category: string;
    stock: number;
    createdAt: Date;
}

export interface User {
    _id?: string;
    name: string;
    email: string;
    image?: string;
    role: "user" | "seller" | "admin";
    createdAt?: Date;
}

export interface CartItem {
    product: Product;
    quantity: number;
}

export interface Order {
    _id?: string;
    userId: string;
    items: CartItem[];
    totalPrice: number;
    status: "pending" | "processing" | "shipped" | "delivered";
    createdAt?: Date;
}