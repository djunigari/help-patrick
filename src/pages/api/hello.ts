// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import protectAPI from '@middleware/protectAPI';
import { auth } from 'backend/utils/firebase';
import type { NextApiRequest, NextApiResponse } from 'next';

// type Data = {
//   name: string
// }

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (!req.headers.token) {
    return res.status(401).json({ error: 'Please include id token' });
  }

  try {
    const { uid } = await auth.verifyIdToken(req.headers.token as string);

    res.status(200).json({ uid: uid })
  } catch (error: any) {
    return res.status(401).json({ error: error.message });
  }

}
export default protectAPI(handler);
