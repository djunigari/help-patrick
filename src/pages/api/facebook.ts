import getFacebookPagesId from 'backend/services/facebook/GetFacebookPagesId'
import { auth } from 'backend/utils/firebase';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { uid } = await auth.verifyIdToken(req.headers.token as string);
    const pages = await getFacebookPagesId(uid)
    res.status(200).json(pages)
}