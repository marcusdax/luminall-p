import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
  version: string
  timestamp: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({
    name: 'Luminall PropertyInsight API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  })
}