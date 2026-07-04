import type { NextApiRequest, NextApiResponse } from 'next'

// Enhanced property type with probate data
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
  probateStatus?: 'In Probate' | 'Probate Completed' | 'Not Applicable'
  probateValue?: number
  probateDate?: string
  estateType?: 'Testate' | 'Intestate'
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
    type: 'House',
    probateStatus: 'Probate Completed',
    probateValue: 850000,
    probateDate: '2023-05-15',
    estateType: 'Testate'
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
    type: 'House',
    probateStatus: 'In Probate',
    probateValue: 1250000,
    probateDate: '2024-01-10',
    estateType: 'Intestate'
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
    type: 'Condo',
    probateStatus: 'Not Applicable',
    probateValue: 0,
    probateDate: 'N/A',
    estateType: 'N/A'
  }
]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Property[]>
) {
  // In production, you would fetch from your backend API here
  // For now, we return mock data with probate information
  res.status(200).json(mockProperties)
}