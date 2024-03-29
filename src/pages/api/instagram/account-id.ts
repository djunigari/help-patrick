import getAccessToken from '@backend/repositories/GetAccessToken';
import getInstagramBusinessAccountId from 'backend/services/instagram/GetInstagramBusinessAccountId';
import { auth } from 'backend/utils/firebase';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { uid } = await auth.verifyIdToken(req.headers.token as string);
        const accessToken = await getAccessToken({ userId: uid })
        const facebookPageId = req.query.facebookPageId as string
        const accountId = await getInstagramBusinessAccountId({ facebookPageId, accessToken })
        res.status(200).json(accountId)
    } catch (error: any) {
        console.log(error.message)
        res.status(500).json(error.message)
    }
}