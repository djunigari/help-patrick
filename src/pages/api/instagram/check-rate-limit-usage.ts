import getAccessToken from '@backend/repositories/GetAccessToken';
import getInstagramId from '@backend/repositories/GetInstagramId';
import checkingRateLimitUsageOk from '@backend/services/instagram/CheckingRateLimitUsageOk';
import { auth } from 'backend/utils/firebase';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { uid } = await auth.verifyIdToken(req.headers.token as string);
        const accessToken = await getAccessToken({ userId: uid })
        const instagramId = await getInstagramId(uid)
        const quatoUsage = await checkingRateLimitUsageOk(instagramId, accessToken)
        console.log('checkRateLimitUsage quatoUsage:', quatoUsage)
        if (quatoUsage < 25) return res.status(200).json(true)
        return res.status(200).json(false)
    } catch (error: any) {
        console.error(error.message)
        res.status(500).json(error.message)
    }
}

