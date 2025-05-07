// src/pages/api/scheduler.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import '../../../lib/scheduler'; 

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ message: 'Scheduler loaded' });
}
