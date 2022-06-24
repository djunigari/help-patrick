import getAccessToken from '@backend/repositories/GetAccessToken';
import getInstagramId from '@backend/repositories/GetInstagramId';
import shareToFeed from '@backend/services/instagram/SingleMedia/ShareToFeed';
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
        const { imageUrl, caption } = req.body

        const mediaId = await shareToFeed({ accessToken, instagramId, imageUrl, caption })
        console.log('share-single mediaId:', mediaId)
        res.status(200).json(mediaId)
    } catch (error: any) {
        console.error(error.message)
        res.status(500).json(error.message)
    }
}

