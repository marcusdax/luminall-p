import type { NextApiRequest, NextApiResponse } from 'next'

// Mock data - replace with real API calls later
type Property = {
  id: string
  address: string
  price: number
  bedrooms: number
  bathrooms: number
  squareFeet: number
  yearBuilt: number
  status: 'For Sale' | 'For Rent' | 'Sold'
  type: 'House' | 'Apartment' | 'Condo' | 'Land'
}

const mockProperties: Property[] = [
  {
    id: '1',
    address: '123 Main St, New York, NY 10001',
    price: 850000,
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1850,
    yearBuilt: 1995,
    status: 'For Sale',
    type: 'House'
  },
  {
    id: '2',
    address: '456 Oak Ave, San Francisco, CA 94102',
    price: 1250000,
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 2200,
    yearBuilt: 2005,
    status: 'For Sale',
    type: 'House'
  },
  {
    id: '3',
    address: '789 Pine Rd, Austin, TX 78701',
    price: 650000,
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1500,
    yearBuilt: 2010,
    status: 'For Rent',
    type: 'Condo'
  }
]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Property[]>
) {
  // In production, you would fetch from your backend API here
  // For now, we return mock data
  res.status(200).json(mockProperties)
}