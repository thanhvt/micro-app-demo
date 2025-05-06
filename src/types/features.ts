// Product feature types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  createdAt: string;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
}

// Customer feature types
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  joinDate: string;
  status: 'active' | 'inactive';
}

export interface CustomerFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  status: 'active' | 'inactive';
}
