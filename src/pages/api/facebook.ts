import getAccessToken from '@backend/repositories/GetAccessToken';
import getFacebookPagesId from 'backend/services/facebook/GetFacebookPagesId'
import { auth } from 'backend/utils/firebase';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { uid } = await auth.verifyIdToken(req.headers.token as string);
        const accessToken = await getAccessToken({ userId: uid })
        const pages = await getFacebookPagesId({ accessToken })
        res.status(200).json(pages)
    } catch (error: any) {
        res.status(500).json(error.message)
    }
}