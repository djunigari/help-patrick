import getAccessToken from '@backend/repositories/GetAccessToken';
import getInstagramId from '@backend/repositories/GetInstagramId';
import shareToFeed from '@backend/services/instagram/Carousel/ShareToFeed';

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
        const { imageUrls, caption } = req.body
        const mediaId = await shareToFeed({ accessToken, instagramId, imageUrls, caption })
        console.log('share-carousel mediaId:', mediaId)
        res.status(200).json(mediaId)
    } catch (error: any) {
        console.error(error.message)
        res.status(500).json(error.message)
    }
}

