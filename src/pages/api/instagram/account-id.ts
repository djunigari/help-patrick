import getInstagramBusinessAccountId from 'backend/services/instagram/GetInstagramBusinessAccountId';
import { auth } from 'backend/utils/firebase';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { uid } = await auth.verifyIdToken(req.headers.token as string);
        const { facebookPageId } = req.query
        const accountId = await getInstagramBusinessAccountId(uid, facebookPageId as string)
        console.log(accountId)
        res.status(200).json(accountId)
    } catch (error: any) {
        console.log(error.message)
        res.status(500).json(error.message)
    }
}