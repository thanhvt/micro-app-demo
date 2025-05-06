import { Customer, Product } from '../types/features';

// Mock products data
export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Laptop Pro',
    description: 'High-performance laptop for professionals',
    price: 1299.99,
    category: 'Electronics',
    stock: 50,
    createdAt: '2023-01-15T08:30:00Z',
  },
  {
    id: '2',
    name: 'Smartphone X',
    description: 'Latest smartphone with advanced features',
    price: 899.99,
    category: 'Electronics',
    stock: 100,
    createdAt: '2023-02-20T10:15:00Z',
  },
  {
    id: '3',
    name: 'Wireless Headphones',
    description: 'Noise-cancelling wireless headphones',
    price: 199.99,
    category: 'Audio',
    stock: 75,
    createdAt: '2023-03-10T14:45:00Z',
  },
  {
    id: '4',
    name: 'Smart Watch',
    description: 'Fitness and health tracking smart watch',
    price: 249.99,
    category: 'Wearables',
    stock: 60,
    createdAt: '2023-04-05T09:20:00Z',
  },
  {
    id: '5',
    name: 'Tablet Pro',
    description: 'Professional tablet for creative work',
    price: 799.99,
    category: 'Electronics',
    stock: 40,
    createdAt: '2023-05-12T11:30:00Z',
  },
];

// Mock customers data
export const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, Anytown, CA 12345',
    joinDate: '2022-06-10T09:00:00Z',
    status: 'active',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+1 (555) 987-6543',
    address: '456 Oak Ave, Somewhere, NY 67890',
    joinDate: '2022-07-15T14:30:00Z',
    status: 'active',
  },
  {
    id: '3',
    name: 'Robert Johnson',
    email: 'robert.johnson@example.com',
    phone: '+1 (555) 456-7890',
    address: '789 Pine Rd, Nowhere, TX 54321',
    joinDate: '2022-08-20T11:15:00Z',
    status: 'inactive',
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    phone: '+1 (555) 234-5678',
    address: '321 Elm St, Everywhere, FL 13579',
    joinDate: '2022-09-25T16:45:00Z',
    status: 'active',
  },
  {
    id: '5',
    name: 'Michael Wilson',
    email: 'michael.wilson@example.com',
    phone: '+1 (555) 876-5432',
    address: '654 Maple Dr, Anywhere, WA 97531',
    joinDate: '2022-10-30T10:30:00Z',
    status: 'active',
  },
];
