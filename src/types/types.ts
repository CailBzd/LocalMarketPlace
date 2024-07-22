 
  export interface Producer extends User {
    // Ajoutez des propriétés spécifiques au producteur si nécessaire
    products: Product[];
  }
  
  export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    roleId: number;
    role: Role;
    address?: string;
    postalCode?: string;
    city?: string;
    department?: string;
    country?: string;
    phoneNumber?: string;
    latitude?: number;
    longitude?: number;
    shopName?: string; // Nom de la boutique (pour les marchands)
    shopDescription?: string; // Description de la boutique (pour les marchands)
    slots: Slot[];
    orders: Order[];
    reviews: Review[];
  }
  
  export interface Role {
    id: number;
    name: string;
  }
  
  export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    unit: string;
    weight?: number;
    imageBase64: string;
    categoryId: number;
    category: Category;
    userId: number;
    user: User;
    productOrders: ProductOrder[];
    reviews: Review[];
  }
  
  export interface Slot {
    id: number;
    dateTime: Date;
    maxOrders: number;
    availableOrders: number;
    userId: number;
    user: User;
    orders: Order[];
  }
  
  export interface Order {
    id: number;
    userId: number;
    user: User;
    slotId: number;
    slot: Slot;
    totalPrice: number;
    productOrders: ProductOrder[];
  }
  
  export interface ProductOrder {
    id: number;
    quantity: number;
    productId: number;
    product: Product;
    orderId: number;
    order: Order;
  }
  
  export interface Review {
    id: number;
    rating: number;
    comment: string;
    userId: number;
    user: User;
    productId: number;
    product: Product;
  }
  
  export interface Category {
    id: number;
    name: string;
    products: Product[];
  }